# Sifter comment Github action

This action allows you to post a comment using Github Actions.

## Setup

1. Add in your `workflow.yml` the following section:
```yaml
- name: Sifter comment
  uses: felixmosh/sifter-comment-github-action@v1
  with:
    company-name: ${{ secrets.SIFTER_COMPANY_NAME }}
    project-id  : ${{ secrets.PROJECT_ID }}
    sifter-token: ${{ secrets.SIFTER_TOKEN }}
    comment-template: "This issue is resolved and deployed within ${tag} release 🎉"
```
That's it 😋.

### Action inputs
The action has 2 **required** inputs:
1. `company-name` - Your sifter company name (`COMPANY_NAME.sifterapp.com`).
2. `project-id` - The project id to focus on.
3. `sifter-token` - Your sifter API access token.
4. `comment-template` - The message that you want to use, it supports `${tag}` placeholder.

## Useful Links

- [Sifter comment api](https://sifterapp.com/developer/documentation/comments/)
