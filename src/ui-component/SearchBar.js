// import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import Autocomplete from @mui/material
// import FilterPrducts from './filterProducts';
// import { fetchdata } from './fetchdata';

// check arnabghosh.me for rest of tutorial when ready

function SearchBar() {
  return (
    <Box
      className="SearchBar"
      sx={{
        // width: 400,
        // height: 660,
        margin: '10px auto',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}
    >
      {/*when implementing search functionality, add onClick={nameOfFunction} inside SearchIcon*/}
      <TextField
        label="Search"
        id="outlined-start-adornment"
        sx={{ m: 1, width: '50ch' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      {/*<Autocomplete*/}
      {/*  disablePortal*/}
      {/*  id="combo-box-demo"*/}
      {/*  renderInput={(params) => (*/}
      {/*    <TextField*/}
      {/*      {...params}*/}
      {/*      label="Search title"*/}
      {/*      sx={{*/}
      {/*        width: 350,*/}
      {/*        margin: '10px auto'*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  )}*/}
      {/* options={searchOptions}/>*/}
    </Box>
  );
}

export default SearchBar;
