import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, PolylineF } from "@react-google-maps/api";
import '../styles/global.css';
import { Coordinates } from '../types';
import { Button } from '@mui/material';


export default function Map({ sourceCoordinates, destinationCoordinates }: Coordinates) {

    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
    const { isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,

    });
    if (!isLoaded) return <div>Loading...</div>;

    const fitBounds = (map: google.maps.Map) => {
        if (map) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds?.extend(sourceCoordinates!)
            bounds?.extend(destinationCoordinates!)
            map?.fitBounds(bounds);
        }
    };
    const recenter = () => {
        if (sourceCoordinates && destinationCoordinates) {
            fitBounds(mapRef!);
        }
    };
    // useEffect(()=>{
    //     if (sourceCoordinates && destinationCoordinates){
    //         fitBounds(mapRef);
    //     }
    // },[sourceCoordinates, destinationCoordinates])

    const loadHandler = (map: google.maps.Map) => {
        console.log(typeof map)
        setMapRef(map);
        fitBounds(map);
    };

    const options = {
        strokeColor: '#FF0000',
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: 30000,
        zIndex: 1
    };
    

    console.log(sourceCoordinates);

    console.log(destinationCoordinates);
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }
    return (
        !isLoaded ? (<p>Loading </p>)
            :
            (
                <>
                    <Button variant="contained" sx={{ width: 100 }} onClick={recenter} >Recenter</Button>
                    <GoogleMap onLoad={loadHandler} mapContainerClassName="map-container">
                        <MarkerF position={sourceCoordinates!} />
                        <MarkerF position={destinationCoordinates!} />
                        <PolylineF options={options} path={[sourceCoordinates!, destinationCoordinates!]} />
                    </GoogleMap>
                </>
            )
    );
}