import {inject} from "aurelia-framework"
import {HttpClient} from "aurelia-fetch-client"
import "fetch"

@inject(HttpClient)
export class Api{
  constructor(HttpClient){
    this.http = HttpClient;

    //config default api calls and default login
    this.http.configure(config=>config.useStandardConfiguration()
        .withBaseUrl('http://localhost:39684/api/'));
  }
}
