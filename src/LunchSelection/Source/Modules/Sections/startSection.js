import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"

@inject(EventAggregator)
export class StartSection{

  constructor(EventAggregator){
    this.eventAggregator = EventAggregator;
  }

  continue(){
    this.eventAggregator.publish('on-continue');
  }

}
