import { error } from '@actions/core';
import { extractIssueIds } from './extractIssueIds';
import { getCommitMessagesBetween } from './getCommitMessagesBetween';
import { getTagsRange } from './getTagsRange';
import { postCommentsOn } from './postCommentsOn';

async function main() {
  const tagsRange = await getTagsRange();
  const commitMessages = await getCommitMessagesBetween(tagsRange);
  const issueIds = extractIssueIds(commitMessages);

  await postCommentsOn(issueIds, tagsRange[0]);
}

main().catch(error);
