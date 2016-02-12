import bootstrap from "bootstrap"
import $ from "bootstrap"
import _start from "./sections/start"
import {EventAggregator} from "aurelia-event-aggregator"
import {inject} from "aurelia-framework"

@inject(EventAggregator)
export class Home{
  constructor(EventAggregator){
    this.currentStep = 0;
    EventAggregator.subscribe('on-continue', ()=>{
      this.onContinue();
    });
  }

  onContinue(){
    this.currentStep+=1;
    console.log(this.currentStep);
  }

}
