import { ApiType } from "@types/api";
import { JsonService } from "services/json";

async function fetch(http: JsonService, path: string) {
  const [data] = await http.fetch(path);
  return data;
}

export class HttpApi implements ApiType {
  http: JsonService;

  constructor(baseUrl, fetcher) {
    this.http = new JsonService(baseUrl, fetcher);
  }

  getFeatures() {
    return fetch(this.http, "/features");
  }
}
