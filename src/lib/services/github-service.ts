import { Environment } from '../config/environment';
import { VCardFormData } from '../../types/vcard';
import { generateHTML } from '../website/html-generator';

export class GitHubService {
  private token: string;
  private owner: string;

  constructor(env: Environment) {
    this.token = env.github.token;
    this.owner = env.github.owner;
  }

  private base64Encode(str: string): string {
    return btoa(unescape(encodeURIComponent(str)));
  }

  async createRepository(data: VCardFormData): Promise<{ repoUrl: string; deployUrl: string }> {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 7);
    const repoName = `card-${timestamp}-${randomStr}`;

    const repo = await this.createGitHubRepo(repoName, data.name);
    await this.createWebsiteFiles(repoName, data);

    return {
      repoUrl: repo.html_url,
      deployUrl: `https://${repoName}.netlify.app`
    };
  }

  private async createGitHubRepo(name: string, ownerName: string) {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        private: false,
        auto_init: true,
        description: `Digital Business Card for ${ownerName}`
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create repository: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  private async createWebsiteFiles(repoName: string, data: VCardFormData) {
    const htmlContent = await generateHTML(data);
    const netlifyConfig = `
[build]
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`.trim();

    await Promise.all([
      this.createFile(repoName, 'index.html', htmlContent),
      this.createFile(repoName, 'netlify.toml', netlifyConfig)
    ]);
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
          content: this.base64Encode(content),
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create ${path}: ${error.message}`);
    }
  }
}