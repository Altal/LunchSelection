import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"
import {Api} from "../../models/api"
import {Router} from 'aurelia-router';

@inject(EventAggregator, Api, Router)
export class LoginSection{

  constructor(EventAggregator, Api, Router){
    this.eventAggregator = EventAggregator;
    this.api = Api;
    this.user = {
      email: null,
      name: null
    }
    this.router = Router;
  }

  continue(){
    //call backend and redirect to the new page
    this.api.http.fetch('new',{
            method: 'POST',
            body: this.user,
            contentType: 'application/json'
          }).then(response =>response.json())
          .then(json=>this.router.navigate(json.Id));
  }
}
