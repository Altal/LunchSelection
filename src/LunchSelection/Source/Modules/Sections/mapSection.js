import {inject} from "aurelia-framework"
import {EventAggregator} from "aurelia-event-aggregator"

//place class represents map marker, place and additional properties
class Place{
  constructor(marker, place){
    this.isSelected = false;
    this.marker = marker;
    this.place = place;
  }
}

@inject(Element, EventAggregator)
export class MapSection{

  constructor(Element, EventAggregator){
    this.element = Element;
    this.eventAggregator = EventAggregator;
    this.places = [];
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
                  types: ['restaurant','food']
                };
          let map = this.map;
          let service = new google.maps.places.PlacesService(map);
          let clearMarkers = this.clearMarkers;
          let places = this.places;

          console.log(places);
          service.nearbySearch(request, function(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                clearMarkers(places);
                for (var i = 0; i < results.length; i++) {
                  var place = results[i];

                  var marker = new google.maps.Marker({
                    map: map,
                    icon: '../content/images/place.png',
                    anchor: new google.maps.Point(16, 16),
                    origin: new google.maps.Point(0, 0),
                    position: place.geometry.location
                  });
                  places.push(new Place(marker, place));
                }
            }
            });
        });
        }
  }

  clearMarkers(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].marker.setMap(null);
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

  highlightPlace(place){
    place.marker.setIcon('../content/images/place-selected.png');
  }
  releasePlace(place){
    if(!place.isSelected)
      place.marker.setIcon('../content/images/place.png');
  }

  selectPlace(place){
    place.isSelected = !place.isSelected;
    if(place.isSelected)
      place.marker.setIcon('../content/images/place-selected.png');
    else
      place.marker.setIcon('../content/images/place.png');
  }
}

export class IsSelectedToClassValueConverter{
  toView(val){
    return val ? 'selected' : null;
  }
}
