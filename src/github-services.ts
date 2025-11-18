import { debug } from '@actions/core'
import { getOctokit } from '@actions/github'

export interface IFile {
  filename: string
}

export class GitHubService {
  private readonly octokit

  constructor(gitHubToken: string) {
    this.octokit = getOctokit(gitHubToken)
  }

  async getChangedFiles(repositoryOwner: string, repositoryName: string, commitSHA: string): Promise<IFile[]> {
    const responseBody = await this.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
      owner: repositoryOwner,
      repo: repositoryName,
      ref: commitSHA
    })

    const files =
      responseBody.data.files?.map(file => {
        return { filename: file.filename }
      }) ?? []

    debug(`Commit ${commitSHA} includes following files: ${JSON.stringify(files)}`)

    return files
  }
}
