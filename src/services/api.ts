import { Api } from "@types/api";
import { Fetcher } from "utils/fetcher";
import { JsonService } from "utils/json";

async function fetch(http, path) {
  const [data] = await http.fetch(path);
  return data;
}

export class HttpApi implements Api {
  http:  JsonService;

  constructor(baseUrl, fetcher) {
    this.http = new JsonService(baseUrl, fetcher);
  }

  getFeatures() {
    return fetch(this.http, "/features");
  }
}
