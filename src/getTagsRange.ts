import { execa } from 'execa';

export async function getTagsRange(): Promise<[string, string]> {
  const { stdout: revList } = await execa('git', ['rev-list', '--tags', '--max-count=2']);
  const { stdout } = await execa('git', ['describe', '--abbrev=0', '--tags'].concat(revList.split('\n')));
  const tags = stdout.split('\n');
  if (tags.length !== 2) {
    throw new Error('Tags range not found');
  }

  return [tags[0], tags[1]];
}
