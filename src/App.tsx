import { useEffect, useState } from 'react'
import SearchField from './components/SearchField'
import { Stack, Button } from '@mui/material';
import Map from './components/Map';
import Header from './components/Header';
import { Point, AirportDetailType } from './types'



function App() {
  const [srcAirport, setSrcAirport] = useState<AirportDetailType | null>();
  const [destinationAirport, setDestinationAirport] = useState<AirportDetailType | null>()
  const [dist, setDist] = useState<number>()
  const [showMap, setShowMap] = useState(false);
  const [btnEanble, setBtnEnable] = useState(false);

  function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  useEffect(() => {
    if(!srcAirport && !destinationAirport){
      setShowMap(false);
    }
    if (srcAirport && destinationAirport){
      setBtnEnable(true);
    }else{
      setBtnEnable(false);
    }

  }, [srcAirport, destinationAirport])

  const findDistance = () => {
    if (srcAirport && destinationAirport) {
      let srcCoordinate = srcAirport.points;
      let destCoordinate = destinationAirport.points;
      console.log(srcAirport)
      const calculatedKM = distance(srcCoordinate!.lat, srcCoordinate!.lng, destCoordinate!.lat, destCoordinate!.lng)
      let miles = 0.53996 * calculatedKM;
      setDist(Math.round(miles))
      setShowMap(true);
    }else{
      console.log('fields cant be empty')
    }
  }

  return (
      <Stack  sx={{ m:2}} spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Header />
      <Stack sx={{flex: 1}} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <SearchField label='source' setAirportDetails={setSrcAirport} />
        <SearchField label='destination' setAirportDetails={setDestinationAirport} />
        <Button disabled={!btnEanble} variant="contained" sx={{ minWidth:180 }} onClick={findDistance}>Find Distance</Button>
      </Stack>
      
      {
        showMap &&
        <>
        <h4>{`${dist} nautical miles is the distance from ${srcAirport?.name} to ${destinationAirport?.name}`}</h4>
        <Map sourceCoordinates={srcAirport?.points} destinationCoordinates={destinationAirport?.points} />
        </>
        
      }
      </Stack>
  )
}

export default App
