import {inject} from "aurelia-framework"

@inject(Element)
export class MapSection{

  constructor(Element){
    this.element = Element;
  }

  attached(){
    var map = new google.maps.Map($(this.element).find('#map')[0],{
      center: {lat: 44.540, lng: -78.546},
      zoom: 8
    });
  }

}
