import React, { useState, createContext, useEffect } from "react";
import Axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Auth0ProviderWithHistory from "./auth0-provider-with-history";

import Cases from "./routes/Cases"
import Case_detail from "./routes/Case_detail"
import Cart from "./routes/Cart"
import LandingPage from "./routes/LandingPage"
import Navbar from "./Navbar"
import NotFound from "./routes/NotFound"
import WeaponDetail from "./routes/WeaponDetail";
import RaritySkins from "./routes/RaritySkins";

import Weapons from "./routes/Weapons";

export const AppContext = createContext(null);

const App = () => {
  const [casename, setCasename] = useState("")
  const [skin, setSkin] = useState("")
  const [cartContentNum, setCartContentNum]= useState(0)
  const [cartContent, setCartContent]= useState([])

  return(
    <AppContext.Provider value={{ casename, setCasename, cartContentNum, setCartContentNum, cartContent, setCartContent }}>
      <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Skin/*" element={<WeaponDetail />} />
          <Route path="Skin/" element={<NotFound />} />
          <Route path="Rarity/*" element={<RaritySkins />} />
          <Route path="Rarity/" element={<NotFound />} />
          <Route path="Cases" element={<Cases />} />
          <Route path="Cases/*" element={<Case_detail />} />
          <Route path=":type" element={<Weapons />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default App