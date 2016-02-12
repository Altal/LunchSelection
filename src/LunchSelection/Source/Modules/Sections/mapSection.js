import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"

@inject(Element, EventAggregator)
export class MapSection{

  constructor(Element, EventAggregator){
    this.element = Element;
    this.eventAggregator = EventAggregator;
    this.markers = [];
  }

  //initialize map
  initMap() {
      if(this.map){
        console.log('map is already initialized')
        return;
      }

      //generate map
      this.map = new google.maps.Map($(this.element).find('#map')[0],{
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
            this.map.setCenter(pos);
            //set current location
            let icon = {
              url: '../content/images/me.png',
              anchor: new google.maps.Point(16, 16),
              origin: new google.maps.Point(0, 0),
            };
            let meMarker = new google.maps.Marker({
                                  position: pos,
                                  map: this.map,
                                  icon: icon
                                });
        });

        //start search for restaurants
        this.map.addListener('idle', ()=>{
          console.log('search places');
          let request = {
                  bounds: this.map.getBounds(),
                  types: ['restaurant']
                };
          let map = this.map;
          let service = new google.maps.places.PlacesService(map);
          let clearMarkers = this.clearMarkers;
          let markers = this.markers;
          console.log(markers);
          service.nearbySearch(request, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers(markers);
                for (var i = 0; i < results.length; i++) {
                  var place = results[i];

                  var marker = new google.maps.Marker({
                    map: map,
                    icon: place.icon,
                    position: place.geometry.location
                  });
                  markers.push(marker);
                }
            }
            });
        });
        }
  }

  clearMarkers(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.splice(0, markers.length);
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
