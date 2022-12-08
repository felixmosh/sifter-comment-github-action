import { info } from '@actions/core';
import { execa } from 'execa';

export async function getTagsRange(): Promise<Readonly<[string, string]>> {
  const expectedTags = 2;
  const { stdout: revList } = await execa('git', [
    'rev-list',
    '--tags',
    `--max-count=${expectedTags}`,
  ]);
  const { stdout } = await execa(
    'git',
    ['describe', '--abbrev=0', '--tags'].concat(revList.split('\n'))
  );
  const tags = stdout.split('\n');
  if (tags.length !== expectedTags) {
    throw new Error('Tags range not found');
  }
  const tagRange = [tags[0], tags[1]] as const;

  info(`Got the following tag ranges: ${tagRange.join(' ... ')}\n`);

  return tagRange;
}
