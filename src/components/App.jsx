import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, MovieInformation, Movies, Navbar, Profile } from './index';

function App() {
  return (
    <div>
      <CssBaseline />  {/* CssBaseline is a helper component that injects CSS into the DOM. */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
