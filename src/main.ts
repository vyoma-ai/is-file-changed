import { debug, getInput, setFailed, setOutput } from '@actions/core'
import { GitHubService, IFile } from './github-services'
import { context } from '@actions/github'
import { checkChangedFilesAgainstPattern } from './pattern-matcher'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const pattern = getInput('pattern', { required: true })
    const githubToken = getInput('token', { required: true })

    debug('Inputs received')

    const gitHubService = new GitHubService(githubToken)
    const commitSHA = context.sha

    const files: IFile[] = await gitHubService.getChangedFiles(context.repo.owner, context.repo.repo, commitSHA)

    setOutput('changed', checkChangedFilesAgainstPattern(files, pattern))
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message)
    } else {
      setFailed('Unknown error occurred')
    }
  }
}
