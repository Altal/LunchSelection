import {inject} from "aurelia-framework"

@inject(Element)
export class MapSection{

  constructor(Element){
    this.element = Element;
  }

  attached(){

    //generate map
    let map = new google.maps.Map($(this.element).find('#map')[0],{
      center: {lat: 44.540, lng: -78.546},
      zoom: 16
    });

    //get current position
    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          //set map center
          map.setCenter(pos);
          //set current location
          let icon = {
            url: '../content/images/me.png',
            anchor: new google.maps.Point(16, 16),
            origin: new google.maps.Point(0, 0),
          };
          let meMarker = new google.maps.Marker({
                                position: pos,
                                map: map,
                                icon: icon
                              });
      });
    }
  }
}
