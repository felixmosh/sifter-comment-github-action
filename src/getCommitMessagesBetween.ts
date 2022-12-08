import { info } from '@actions/core';
import { execa } from 'execa';

export async function getCommitMessagesBetween(
  tagRanges: Readonly<[string, string]>
): Promise<string[]> {
  const { stdout } = await execa('git', [
    'log',
    '--pretty=format:%s',
    tagRanges.join('...'),
  ]);

  const messages = stdout.split('\n');

  info(`Found the following git messages: \n\n${messages}\n`);

  return messages;
}
