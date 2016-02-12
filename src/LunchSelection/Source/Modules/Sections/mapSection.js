import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"

@inject(Element, EventAggregator)
export class MapSection{

  constructor(Element, EventAggregator){
    this.element = Element;
    this.eventAggregator = EventAggregator;
  }

  //initialize map
  initMap() {
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

  //on element attached to the screen
  bind(){
    this.initMap();
  }

  //on finish pressed
  finish(){
    this.eventAggregator.publish('on-continue');
  }
}
