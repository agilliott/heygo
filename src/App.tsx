import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './Components';
import { Home, Location } from './Pages';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="locations/:id" element={<Location />} />
            </Route>
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
