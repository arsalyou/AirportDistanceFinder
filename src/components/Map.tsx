import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGoogleMap, GoogleMap, useLoadScript, MarkerF, PolylineF } from "@react-google-maps/api";
import '../styles/global.css';
import { Coordinates } from '../types';


export default function Map({ sourceCoordinates, destinationCoordinates }: Coordinates) {

    const [mapRef, setMapRef] = useState(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCFHmPDrLwmka2L2wRvO_v7lz__jg4_7AI",
    });
    //console.log(isLoaded);
    if (!isLoaded) return <div>Loading...</div>;

    const fitBounds = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(sourceCoordinates)
        bounds.extend(destinationCoordinates)
        // myPlaces.map(place => {
        //     bounds.extend(place.pos);
        //     return place.id;
        // });
        map.fitBounds(bounds);
    };
    const path = [
        { lat: 44, lng: -80 },
        { lat: 21.291, lng: -157.821 },

    ];

    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 12,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: 30000,
        paths: [
            sourceCoordinates,
            destinationCoordinates,
        ],
        zIndex: 1
    };

    const loadHandler = (map) => {
        setMapRef(map);
        fitBounds(map);
    };

    return (
        !isLoaded ? (<p>Loading </p>)
            :
            (

                <>
                    <GoogleMap onLoad={loadHandler} mapContainerClassName="map-container">
                        <MarkerF position={sourceCoordinates!} />
                        <MarkerF position={destinationCoordinates!} />
                        {<PolylineF options={options} path={[sourceCoordinates!, destinationCoordinates!]} />}
                        {/* <PolylineF options={options} path={path} /> */}
                    </GoogleMap>
                </>
            )
    );
}