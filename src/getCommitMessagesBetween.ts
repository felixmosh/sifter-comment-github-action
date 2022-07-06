import { execa } from 'execa';

export async function getCommitMessagesBetween(tagRanges: [string, string]): Promise<string[]> {
  const { stdout } = await execa('git', ['log', '--pretty=format:%s', tagRanges.join('...')]);

  return stdout.split('\n');
}
