import { debug } from '@actions/core'
import { IFile } from './github-services'

export function checkChangedFilesAgainstPattern(files: IFile[], pattern: string): boolean {
  if (!files || files?.length === 0) {
    debug(`This commit doesn't contain any files`)
    return false
  }
  const regExp = new RegExp(pattern)
  if (files.some(file => regExp.test(file.filename))) {
    return true
  }
  debug(`There isn't any file matching the pattern ${pattern}`)
  return false
}
