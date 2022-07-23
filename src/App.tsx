import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './Components';
import { Home, Location } from './Pages';
import { Grid, Box } from '@mui/material';

function App() {
  return (
    <Grid container padding={3} spacing={3} style={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="location/:id" element={<Location />} />
          </Routes>
        </BrowserRouter>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default App;
