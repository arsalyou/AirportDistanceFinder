import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import InputField from './components/InputField'
import Test from './components/Test'
import SearchField from './components/SearchField'
import Button from '@mui/material/Button';
import Map from './components/Map'
import Home from './components/Home'

type AirportDetailType = {
  name: string,
  latitude: number,
  longitude: number
}

function App() {
  const [count, setCount] = useState(0)
  const [srcAirport, setSrcAirport] = useState<AirportDetailType>();
  const [destinationAirport, setDestinationAirport] = useState<AirportDetailType>()
  const [dist, setDist] = useState<number>()

  function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  
  useEffect(()=>{
    console.log(srcAirport)
  },[srcAirport])

  const findDistance = () => {
    const calculatedKM = distance(srcAirport?.latitude, srcAirport?.longitude, destinationAirport?.latitude, destinationAirport?.longitude)
    let miles = 0.53996 * calculatedKM;
    setDist(miles)
    
  }

  return (
    <div>
      
      <SearchField label='source' setAirportDetails={setSrcAirport}/>
      <SearchField label='destination' setAirportDetails={setDestinationAirport}/>
      <Button onClick={findDistance}>Find Distance</Button>
      <h3>{dist}</h3>
      <Home/>
      
    </div>
  )
}

export default App
