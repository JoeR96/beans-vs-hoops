import { Provider } from 'react-redux';
import store from './redux/store';
import VoteContainer from './components/VoteContainer';
import HoopsAndBeans from './components/HoopsAndBeans';
import { Box } from '@mui/material';
import React, { useState } from 'react';
// rest of your imports...

function App() {

  return (
    <Provider store={store}>
      <Box className="App" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <HoopsAndBeans />
        <VoteContainer  />
      </Box>
    </Provider>
  );
}

export default App;