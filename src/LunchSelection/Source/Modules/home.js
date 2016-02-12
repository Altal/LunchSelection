import bootstrap from "bootstrap"
import $ from "bootstrap"
import {EventAggregator} from "aurelia-event-aggregator"
import {inject} from "aurelia-framework"

@inject(EventAggregator)
export class Home{
  constructor(EventAggregator){
    this.currentStep = 2;
    EventAggregator.subscribe('on-continue', ()=>{
      this.onContinue();
    });
  }

  onContinue(){
    this.currentStep = (++this.currentStep)%4;
    console.log(this.currentStep);
  }

}
