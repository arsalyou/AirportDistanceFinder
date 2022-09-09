import { useEffect, useState } from 'react'
import SearchField from './components/SearchField'
import { Stack, Button } from '@mui/material';
import Map from './components/Map';
import Header from './components/Header';
import {  AirportDetailType } from './types';
import { calculateDistance } from './utils/util';

function App() {
  const [srcAirport, setSrcAirport] = useState<AirportDetailType | null>();
  const [destinationAirport, setDestinationAirport] = useState<AirportDetailType | null>()
  const [dist, setDist] = useState<number>()
  const [showMap, setShowMap] = useState(false);
  const [btnEanble, setBtnEnable] = useState(false);

  useEffect(() => {
    if (!srcAirport && !destinationAirport) {
      setShowMap(false);
    }
    if (srcAirport && destinationAirport) {
      setBtnEnable(true);
      console.log('btn enabled');
    } else {
      setBtnEnable(false);
    }
    console.log(srcAirport, destinationAirport);
    console.log('btn updated');
    findDistance();

  }, [srcAirport, destinationAirport])

  const findDistance = () => {
    if (srcAirport && destinationAirport) {
      let srcCoordinate = srcAirport.points;
      let destCoordinate = destinationAirport.points;
      console.log(srcAirport)
      const calculatedKM = calculateDistance(srcCoordinate!.lat, srcCoordinate!.lng, destCoordinate!.lat, destCoordinate!.lng)
      let miles = 0.53996 * calculatedKM;
      setDist(Math.round(miles))
      setShowMap(true);
    } else {
      console.log('fields cant be empty')
    }
  }

  return (
    <Stack sx={{ m: 2,  }}  spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Header />
      <Stack sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <SearchField name='source' setAirportDetails={setSrcAirport} />
        <SearchField name='destination' setAirportDetails={setDestinationAirport} />
        {/* <Button disabled={!btnEanble} variant="contained" sx={{ minWidth: 180 }} onClick={findDistance}>Find Distance</Button> */}
      </Stack>
      {
        showMap && srcAirport && destinationAirport &&
        <Stack sx={{  display: 'flex', justifyContent: 'center', alignItems:'center' }}  spacing={1}>
          <h4>{`${dist} nautical miles is the distance from ${srcAirport?.name} to ${destinationAirport?.name}`}</h4>
          <Map sourceCoordinates={srcAirport?.points} destinationCoordinates={destinationAirport?.points} />
        </Stack>

      }
    </Stack>
  )
}

export default App
