import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Movies from "./components/Movies";
import Popular from "./components/Popular";
import Trailer from "./components/Templates/Trailer";
import Trending from "./components/Trending";
import TvDetails from "./components/TvDetails";
import TvShows from "./components/TvShows";

const App = () => {
  return (
    <div className="w-screen h-screen flex bg-[#1F1E24]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/details/:id" element={<MovieDetails />} />
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
      </Routes>
    </div>
  );
};

export default App;
