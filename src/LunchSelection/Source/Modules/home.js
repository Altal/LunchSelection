import bootstrap from "bootstrap"
import $ from "bootstrap"

export class Home{


  attached(){
    var map = new google.maps.Map($('#map')[0],{
      center: {lat: 44.540, lng: -78.546},
      zoom: 8
    });
  }
}
