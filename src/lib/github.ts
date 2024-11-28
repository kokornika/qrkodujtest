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

  private base64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  async createRepository(
    data: VCardFormData,
    orderId?: string
  ): Promise<{ repoUrl: string; deployUrl: string }> {
    try {
      const repoName = `digital-card-${orderId || this.generateOrderId()}`;
      
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
          private: false,
          auto_init: true,
          description: `Digital Business Card for ${data.name}`
        })
      });

      if (!createRepoResponse.ok) {
        const errorData = await createRepoResponse.json();
        throw new Error(`Failed to create repository: ${JSON.stringify(errorData)}`);
      }

      const repo = await createRepoResponse.json();

      // Wait for repository creation to complete
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate website content
      const htmlContent = await generateHTML(data);

      // Create necessary files
      await Promise.all([
        // Create index.html
        this.createFile(repoName, 'index.html', htmlContent),
        
        // Create netlify.toml
        this.createFile(repoName, 'netlify.toml', `
[build]
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
        `.trim()),

        // Create _redirects
        this.createFile(repoName, '_redirects', '/* /index.html 200'),
      ]);

      // Deploy to Netlify
      const deployUrl = `https://${repoName}.netlify.app`;

      return {
        repoUrl: repo.html_url,
        deployUrl
      };
    } catch (error) {
      console.error('Error creating GitHub repository:', error);
      throw error;
    }
  }

  private async createFile(repoName: string, path: string, content: string): Promise<void> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Add ${path}`,
            content: this.base64Encode(content)
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to create ${path}: ${JSON.stringify(error)}`);
      }
    } catch (error) {
      console.error(`Error creating ${path}:`, error);
      throw error;
    }
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `${timestamp}-${randomStr}`;
  }
}