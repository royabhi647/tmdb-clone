import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Banner from "./Components/Banner";
import Favourites from "./Components/Favourites";
import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Pagination from "./Components/Pagination";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies />
              </>
            }
          />

          <Route path="/fav" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
