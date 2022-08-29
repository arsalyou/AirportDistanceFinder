import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../styles/global.css'

import { useGoogleMap, GoogleMap, useLoadScript, MarkerF, PolylineF } from "@react-google-maps/api";

export default function Home() {
  
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCFHmPDrLwmka2L2wRvO_v7lz__jg4_7AI",
    });
    //console.log(isLoaded);
    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
  }
  
  function Map() {

    const [mapRef, setMapRef] = useState(null);

  const myPlaces = [
    { id: "place1", pos:  {lat: 44, lng: -80} },
    { id: "place2", pos:  {lat: 21.291, lng: -157.821}},
  ];
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces.map(place => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };
    
    // const map = useRef(null);
    // //const map = useGoogleMap()
    // useEffect(()=>{
    //   console.log(map)
    // },[map])

    const path = [
      {lat: 44, lng: -80},
      {lat: 21.291, lng: -157.821},
      
    ];
    // function fitBounds() {
      
     
    //   // window.google.maps is automatically added to global window object after map loads
    //    const bounds = new (window as any).google.maps.LatLngBounds();
   
    //   // array containing positional data of markers
    //   path.forEach(marker => {
    //      bounds.extend({lat: marker.lat, lng: marker.lng});
    //    });
      
    //   // The map object you get from <GoogleMap> onLoad
    //    map.fitBounds(bounds);
    //  }
    const onLoad = polyline => {
      //console.log('polyline: ', polyline)

      //console.log(map)
      //fitBounds()
    };
    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
    const options = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 12,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 30000,
      paths: [
        {lat: 44, lng: -80},
        {lat: 21.291, lng: -157.821},
        
      ],
      zIndex: 1
    };

    const loadHandler = map => {
      // Store a reference to the google map instance in state
      setMapRef(map);
      // Fit map bounds to contain all markers
      fitBounds(map);
    };
    
    return (
      <GoogleMap zoom={10} center={center}  onLoad={loadHandler} mapContainerClassName="map-container"
     
      >
        <MarkerF position={center} />
        <PolylineF
     options={options}
      path={path}
      onLoad={onLoad}


    />
      </GoogleMap>
    );
  }