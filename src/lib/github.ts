import { VCardFormData } from '../types/vcard';
import { generateHTML } from './website/html-generator';
import { config } from './config';

export class GitHubRepository {
  private owner: string;
  private token: string;

  constructor() {
    this.token = config.github.token;
    this.owner = config.github.owner;
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `${timestamp}-${randomStr}`;
  }

  private base64Encode(str: string): string {
    // Use browser-safe base64 encoding
    return btoa(unescape(encodeURIComponent(str)));
  }

  async createRepository(data: VCardFormData): Promise<{ repoUrl: string; orderId: string }> {
    try {
      const orderId = this.generateOrderId();
      const repoName = `digital-card-${orderId}`;
      
      // Create repository using GitHub API
      const createRepoResponse = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: repoName,
          private: true,
          auto_init: false,
          description: `Digital Business Card for ${data.name} (Order ID: ${orderId})`
        })
      });

      if (!createRepoResponse.ok) {
        const errorData = await createRepoResponse.json();
        throw new Error(`Failed to create repository: ${JSON.stringify(errorData)}`);
      }

      const repo = await createRepoResponse.json();

      // Generate website content
      const htmlContent = await generateHTML(data);

      // Create index.html file
      const createFileResponse = await fetch(`https://api.github.com/repos/${this.owner}/${repoName}/contents/index.html`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Initial website setup',
          content: this.base64Encode(htmlContent)
        })
      });

      if (!createFileResponse.ok) {
        const errorData = await createFileResponse.json();
        throw new Error(`Failed to create index.html: ${JSON.stringify(errorData)}`);
      }

      return {
        repoUrl: repo.html_url,
        orderId: orderId
      };
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      throw error;
    }
  }
}