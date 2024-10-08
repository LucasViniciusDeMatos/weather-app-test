import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoriteProvider from "./modules/favoriteProvider.js";
import Layout from "./components/Layout/index.jsx";
import Home from "./pages/Home/index.jsx";
import Favorite from "./pages/Favorite/index.jsx";

function App() {
  return (
    <FavoriteProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoriteProvider>
  );
}

export default App;
