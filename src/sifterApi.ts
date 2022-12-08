import axios, { AxiosInstance } from 'axios';
import { ISifterIssue } from '../types/sifter';
import { IConfig } from './getConfig';

export class SifterApi {
  private readonly axios: AxiosInstance;
  private readonly projectId: string;

  constructor(config: IConfig) {
    this.projectId = config.PROJECT_ID;

    this.axios = axios.create({
      baseURL: `https://${config.COMPANY_NAME}.sifterapp.com/api`,
      headers: {
        'x-sifter-token': config.SIFTER_TOKEN,
        Accept: '*/*',
      },
    });
  }

  public getProjectIssues(): Promise<ISifterIssue[]> {
    return this.axios
      .get(`/projects/${this.projectId}/issues?srt=created&d=d`)
      .then(({ data }) => data?.issues || []);
  }

  public postComment(comment: string, issueId: string) {
    return this.axios
      .post(`/projects/${this.projectId}/issues/${issueId}`, {
        body: comment,
      })
      .then(({ data }) => data);
  }
}
