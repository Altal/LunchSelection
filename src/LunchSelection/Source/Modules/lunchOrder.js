import {EventAggregator} from "aurelia-event-aggregator"
import {inject} from "aurelia-framework"

@inject(EventAggregator)
export class LunchOrder{
  constructor(EventAggregator){
    this.currentStep = 1;
    EventAggregator.subscribe('on-continue', ()=>{
      this.onContinue();
    });
  }

  onContinue(){
    this.currentStep = (++this.currentStep)%4;
    console.log(this.currentStep);
  }
}
