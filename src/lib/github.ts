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
      const baseRepoName = `digital-card-${orderId || this.generateOrderId()}`;
      let repoName = baseRepoName;
      let attempt = 1;

      // Try to create repository with unique name
      while (attempt <= 5) {
        try {
          const checkRepoResponse = await fetch(
            `https://api.github.com/repos/${this.owner}/${repoName}`,
            {
              headers: {
                'Authorization': `token ${this.token}`,
                'Accept': 'application/vnd.github.v3+json',
              },
            }
          );

          if (checkRepoResponse.status === 404) {
            // Repository name is available
            break;
          }

          // Repository exists, try next name
          repoName = `${baseRepoName}-${attempt}`;
          attempt++;
        } catch (error) {
          console.error('Error checking repository existence:', error);
          throw error;
        }
      }

      if (attempt > 5) {
        throw new Error('Failed to generate unique repository name after 5 attempts');
      }

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

      await new Promise(resolve => setTimeout(resolve, 5000));

      const htmlContent = await generateHTML(data);

      await this.createFile(repoName, 'index.html', htmlContent);
      await this.createFile(repoName, 'netlify.toml', `
[build]
  publish = "/"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`.trim());

      const deployUrl = `https://${repoName}.qrnevjegy.hu`;

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
      const repoResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}`,
        {
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!repoResponse.ok) {
        throw new Error('Failed to get repository information');
      }

      const repoInfo = await repoResponse.json();
      const defaultBranch = repoInfo.default_branch;

      const refResponse = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}/git/refs/heads/${defaultBranch}`,
        {
          headers: {
            'Authorization': `token ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!refResponse.ok) {
        throw new Error('Failed to get reference');
      }

      const refData = await refResponse.json();
      const latestCommitSha = refData.object.sha;

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
            branch: defaultBranch,
            sha: latestCommitSha
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