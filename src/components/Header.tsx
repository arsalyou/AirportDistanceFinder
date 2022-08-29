import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

export default function Header(){
    return (
        <>
         <Box sx={{ display:'flex', justifyContent:'center', backgroundColor:'#aca2db', borderRadius:5, p:2}}>
          <Typography sx={{ color:'#ffff' }} variant="h4">
          Airport Distance Calculator
          </Typography  >
        </Box>
        </>

    )
}