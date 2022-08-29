import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';

type AirportFieldProps = {
  label: string
}

const filterOptions = createFilterOptions({
  stringify: (option) => option.name,
});
export default function InputField({ label}: AirportFieldProps) {
  const [query, setQuery] = useState('');
  const [airports, setAirports] = useState([]);
  const REACT_APP_API_Key = '0d8112d88b' 
  const REACT_APP_API_Secret = 'e474d10509ce7d0'

  

  const getData = async () =>{
    if (query.length > 2){
      const res = await axios({
        method: 'POST',
        url: `https://www.air-port-codes.com/api/v1/multi?term=${query}`,
        headers:{
          'APC-Auth': REACT_APP_API_Key,
          'APC-Auth-Secret': REACT_APP_API_Secret
        }
      });
      const data = res?.data?.airports;
      console.log(res);
      const tmp = data.map(item => {
        return ({
          'name': item.name,
          'latitude': item.latitude,
          'longitude': item.longitude
      })})
      
      setAirports(tmp);
      
    }
  }

  useEffect(()=>{
    getData();

  }, [query])

  return (
    <Autocomplete
    inputValue={query}
    getOptionSelected={(option, value) => {
      option.name === value.name;
      console.log(option);
    }}
    onInputChange={(e) => setQuery(e.target.value)}
    id="combo-box-demo"
    options={airports}
    filterOptions={filterOptions}
    getOptionLabel={(option) => option.name}
    style={{ width: 300 }}
    renderInput={(params) => (
      <TextField {...params} label="Combo box" variant="outlined" />
    )}
    />
  );
}

