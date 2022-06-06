import React, { useState, createContext, useEffect } from "react";
import Axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Cases from "./routes/Cases"
import Case_detail from "./routes/Case_detail"
import Knives from "./routes/Knives"
import Pistols from "./routes/Pistols"
import Rifles from "./routes/Rifles"
import SMGs from "./routes/SMGs"
import Heavy from "./routes/Heavy"
import LandingPage from "./routes/LandingPage"
import Navbar from "./Navbar"
import NotFound from "./routes/NotFound"
import WeaponDetail from "./routes/WeaponDetail";
import RaritySkins from "./routes/RaritySkins";
import Auth from "./routes/Auth";
import Auth0ProviderWithHistory from "./auth0-provider-with-history";

export const AppContext = createContext(null);

const App = () => {
  const [casename, setCasename] = useState("")
  const [skin, setSkin] = useState("")
  return(
    <AppContext.Provider value={{ casename, setCasename }}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="Auth" element={<Auth />} />
          <Route path="Skin/*" element={<WeaponDetail />} />
          <Route path="Skin/" element={<NotFound />} />
          <Route path="Rarity/*" element={<RaritySkins />} />
          <Route path="Rarity/" element={<NotFound />} />
          <Route path="Knives" element={<Knives />} />
          <Route path="Pistols" element={<Pistols />} />
          <Route path="Rifles" element={<Rifles />} />
          <Route path="SMGs" element={<SMGs />} />
          <Route path="Heavy" element={<Heavy />} />
          <Route path="Cases" element={<Cases />} />
          <Route path="Cases/*" element={<Case_detail />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
export default App