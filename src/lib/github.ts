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
          auto_init: false,
          description: `Digital Business Card for ${data.name}`
        })
      });

      if (!createRepoResponse.ok) {
        const errorData = await createRepoResponse.json();
        throw new Error(`Failed to create repository: ${JSON.stringify(errorData)}`);
      }

      const repo = await createRepoResponse.json();

      // Wait for repository creation to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

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
      ]);

      // Deploy to Netlify
      const deployUrl = await this.deployToNetlify(repoName);

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
  }

  private async deployToNetlify(repoName: string): Promise<string> {
    const deployHook = `https://api.netlify.com/build_hooks/${process.env.NETLIFY_BUILD_HOOK_ID}`;
    
    const response = await fetch(deployHook, {
      method: 'POST',
      body: JSON.stringify({
        clear_cache: true
      })
    });

    if (!response.ok) {
      throw new Error('Failed to trigger Netlify deployment');
    }

    // Return the expected Netlify URL
    return `https://${repoName}.netlify.app`;
  }

  private generateOrderId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    return `${timestamp}-${randomStr}`;
  }
}