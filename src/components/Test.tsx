import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

const filterOptions = createFilterOptions({
    stringify: (option) => option.name,
  });
  
  export default function Test() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
  
    const [options, setOptions] = React.useState([]);
    const loading = open && options?.length === 0;
  
    const onChangeHandle = async (value) => {
      const res = await axios({
        method: 'POST',
        url: `https://www.air-port-codes.com/api/v1/multi?term=${value}`,
        headers:{
          'APC-Auth': '0d8112d88b',
          'APC-Auth-Secret': 'e474d10509ce7d0'
        }
      });
      const data = res?.data?.airports;
      console.log(res);
      const temp = data?.map(item => {
        return ({
          'name': item.name,
          'latitude': item.latitude,
          'longitude': item.longitude
      })})
      console.log(temp)
      if (temp){
        setOptions(temp);
      }else{
        setOptions([]);
      }
      
    };
  
    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
  
    return (
      <Autocomplete
        id="asynchronous-demo"
        filterOptions={filterOptions}
  
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => {
          option.name === value.name;
          console.log(option);
          console.log(value)
        }}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            variant="outlined"
            onChange={(ev) => {
  
              setQuery(ev.target.value)
              if (ev.target.value !== "" || ev.target.value !== null) {
                console.log(ev.target.value)
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
      />
    );
  }