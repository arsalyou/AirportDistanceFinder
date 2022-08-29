import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from "@react-google-maps/api";
import '../styles/global.css';
import { Coordinates } from '../types';
import { Button } from '@mui/material';

export default function Map({ sourceCoordinates, destinationCoordinates }: Coordinates) {

    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY!,

    });
    if (!isLoaded) return <div>Loading...</div>;

    const fitBounds = (map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(sourceCoordinates!)
        bounds.extend(destinationCoordinates!)
        map.fitBounds(bounds);
    };
    const recenter = () => {
        if (sourceCoordinates && destinationCoordinates){
               fitBounds(mapRef!);
         }
    };
    // useEffect(()=>{
    //     if (sourceCoordinates && destinationCoordinates){
    //         fitBounds(mapRef);
    //     }
    // },[sourceCoordinates, destinationCoordinates])

    const options = {
        strokeColor: '#FF0000',
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: 30000,
        zIndex: 1
    };

    const loadHandler = (map: google.maps.Map ) => {
        console.log(typeof map)
        setMapRef(map);
        fitBounds(map);
    };

    return (
        !isLoaded ? (<p>Loading </p>)
            :
            (
                <>
                <Button onClick={recenter} >Recenter</Button>
                    <GoogleMap onLoad={loadHandler} mapContainerClassName="map-container">
                        <MarkerF position={sourceCoordinates!} />
                        <MarkerF position={destinationCoordinates!} />
                        {<PolylineF options={options} path={[sourceCoordinates!, destinationCoordinates!]} />}
                    </GoogleMap>
                </>
            )
    );
}