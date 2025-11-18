import * as core from '@actions/core'
import { IFile } from '../src/github-services'
import { checkChangedFilesAgainstPattern } from '../src/pattern-matcher'
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'

const coreDebugSpy = jest.fn(() => {})

describe('pattern-matcher', () => {
  beforeEach(() => {
    jest.spyOn(core, 'debug').mockImplementation(coreDebugSpy)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('if matching pattern is rejected', async () => {
    const files: IFile[] = givenFiles()
    const pattern = '.*.js'

    expect(checkChangedFilesAgainstPattern(files, pattern)).toEqual(true)
  })

  test('if non matching pattern is not rejected', async () => {
    const files: IFile[] = givenFiles()
    const pattern = '.*.ts'

    expect(checkChangedFilesAgainstPattern(files, pattern)).toEqual(false)
  })

  test('if empty commit is not rejected', async () => {
    const files: IFile[] = []
    const pattern = '.*'

    expect(checkChangedFilesAgainstPattern(files, pattern)).toEqual(false)
  })
})

function givenFiles(): IFile[] {
  return [{ filename: 'src/file1.js' }, { filename: 'README.md' }]
}
