import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { AirportDetailType } from '../types';
import DisplayMessage from './DisplayMessage';

const filterOptions = createFilterOptions({
  stringify: (option) => option.name,
});

type AirportFieldProps = {
  label: string
  setAirportDetails: (airportDetails: AirportDetailType) => void,
}

export default function SearchField({ label, setAirportDetails }: AirportFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  const [options, setOptions] = React.useState([]);
  const loading = open && options?.length === 0;

  const onChangeHandle = async (value) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://www.air-port-codes.com/api/v1/multi?term=${value}`,
        headers: {
          'APC-Auth': '0d8112d88b',
          'APC-Auth-Secret': 'e474d10509ce7d0'
        }
      });
      const data = res?.data?.airports;
      console.log(res);
      const temp = data?.map(item => {
        return ({
          'name': item.name,
          'points':
          {
            'lat': parseFloat(item.latitude),
            'lng': parseFloat(item.longitude)
          }
        })
      })
      console.log(temp)
      if (temp) {
        setOptions(temp);
      } else {
        setOptions([]);
      }
      setShowError(false)
    } catch (err) {
      console.log(err);
      setError(err);
      setShowError(true);
      let timer: ReturnType<typeof setTimeout> = setTimeout(() => { 
        setShowError(false);
       }, 2000);

      clearTimeout(timer);

    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        filterOptions={filterOptions}
        open={open}
        onOpen={() => { setOpen(true); }}
        onClose={() => { setOpen(false); }}
        isOptionEqualToValue={(option, value) => {
          option.name === value.name;
          // improve set only once 
          setAirportDetails(value)
        }}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            sx={{ minWidth: 300 }}
            onChange={(ev) => {

              setQuery(ev.target.value)
              console.log(ev.target.value)
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
                </React.Fragment>
              )
            }}
          />
        )}
      />
      <DisplayMessage show={showError} message={error}/>

    </>
  );
}