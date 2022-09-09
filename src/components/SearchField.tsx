import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { AirportFieldProps, AirportResponse, AirportDetailType } from '../types';
import DisplayMessage from './DisplayMessage';

export default function SearchField({ name, setAirportDetails }: AirportFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);

  const [showError, setShowError] = useState(false);
  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z ]*$/;

  const filterOptions = createFilterOptions({
    stringify: (option: AirportDetailType) => option.name!,
  });

  const loading = open && options?.length === 0;
  

  const showSnackBar = (errMsg: string) => {
    setError(errMsg)
    setShowError(true);
    let timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowError(false);
      clearTimeout(timer);
    }, 3000);
  }
  const onChangeHandle = async (value: any) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://www.air-port-codes.com/api/v1/multi?term=${value}`,
        headers: {
          'APC-Auth': import.meta.env.VITE_API_Key!,
          'APC-Auth-Secret': import.meta.env.VITE_API_Secret!
        }
      });
      if (res?.data?.statusCode == 200) {
        const data = res?.data?.airports;
        console.log(res);
        const temp = data?.map((item: AirportResponse) => {
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

      }else{
        showSnackBar(res?.data?.message);
        setShowError(true);
      }

    } catch (err: any) {
      console.log(err);
      showSnackBar(err?.message);
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
        isOptionEqualToValue={(option: AirportDetailType, value: AirportDetailType) => {
          setAirportDetails(value)
          return option.name === value.name;
          // improve set only once 
        }}
        getOptionLabel={(option: AirportDetailType) => option.name!}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={name}
            variant="outlined"
            fullWidth
            onKeyDown={(event) => {
              if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{ minWidth: 300 }}
            onChange={(ev) => {
              setQuery(ev.target.value)
              if (ev.target.value === "") {
                setAirportDetails(null);
              }
              if ((ev.target.value !== "" || ev.target.value !== null) && ev.target.value.length > 2) {
                console.log(ev.target.value)
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              spellCheck: true,
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
      <DisplayMessage show={showError} message={error} />
      {/* <DisplayMessage show={true} message="sdsdsd" /> */}

    </>
  );
}
