export function extractIssueIds(messages: string[]): string[] {
  return messages
    .flatMap((message) => {
      const matches = message.matchAll(/(?:closes?|resolves?)\W+#(\d+)/g);
      const ids: string[] = [];
      for (let match of matches) {
        ids.push(match[1]);
      }
      return ids;
    })
    .filter((id, idx, arr) => arr.indexOf(id) === idx);
}
