import { getInput } from '@actions/core';

const Inputs = {
  COMPANY_NAME: 'company-name',
  PROJECT_ID: 'project-id',
  SIFTER_TOKEN: 'sifter-token',
  COMMENT_TEMPLATE: 'comment-template'
} as const;

export type IConfig = { [K in keyof typeof Inputs]: string };

export function getConfig(): IConfig {
  return Object.entries(Inputs).reduce((result, [key, value]) => {
    result[key] = getInput(value, {
      required: true,
      trimWhitespace: true,
    });

    return result;
  }, {} as any);

}
