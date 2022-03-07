import { IncomingHttpHeaders } from 'http';

interface ParamsDictionary {
  [key: string]: string;
}

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export default interface IHttpRequestModel {
  query: ParsedQs;
  params: ParamsDictionary;
  body: any;
  headers: IncomingHttpHeaders;
}
