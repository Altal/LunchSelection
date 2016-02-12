import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"

@inject(EventAggregator)
export class FinishSection{

  constructor(EventAggregator){
    this.eventAggregator = EventAggregator;
  }
  
  continue(){
    this.eventAggregator.publish('on-continue');
  }
}
