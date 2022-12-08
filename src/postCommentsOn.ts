import { error, info } from '@actions/core';
import { getConfig } from './getConfig';
import { SifterApi } from './sifterApi';

export async function postCommentsOn(issueNumbers: string[], tag: string) {
  info(`Posting comments on ${issueNumbers.join(', ')}\n`);

  const config = getConfig();
  const sifterApi = new SifterApi(config);

  const issues = await sifterApi.getProjectIssues();

  const issueIds = issues
    .filter((issue) => issueNumbers.includes(`${issue.number}`))
    .map((issue) => ({
      id: issue.api_url.split('/').pop() as string,
      number: issue.number,
    }));

  const comment = config.COMMENT_TEMPLATE.replace('${tag}', tag);

  if (issueIds.length === 0) {
    info('No relevant issues found.');
  }

  await Promise.all(
    issueIds.map((issue) =>
      sifterApi
        .postComment(comment, issue.id)
        .then(() => {
          info(`Posted successfully on #${issue.number}.`);
        })
        .catch((e) => {
          console.error(e.response?.data);
          error(`Failed to post a comment of issue #${issue.number}`);
        })
    )
  );
}
