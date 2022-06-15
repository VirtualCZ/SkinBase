import React, { useState, createContext, useEffect, useLayoutEffect } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";

export const AppContext = createContext(null);

const App = () => {

  const [casename, setCasename] = useState("")
  const [skin, setSkin] = useState("")
  const [cartContentNum, setCartContentNum]= useState()
  const [cartContent, setCartContent]= useState(JSON.parse(localStorage.getItem('cartContent')))
  const [ authID_admin, setAuthID_admin  ] = useState({})
  const [authSub, setAuthSub] = useState()
  const [setup, setSetup] = useState()

  const { user } = useAuth0();

  useEffect(() => {
    if (authID_admin != undefined && authSub != undefined && authID_admin.idAuth === authSub){
      if (authID_admin.setup === 2){
        setSetup(2)
      }
      else if (authID_admin.setup === 1){
        setSetup(1)
      }
    }
  },[authID_admin])

  useEffect(() => {
    if (cartContent === null){
      setCartContentNum(0)
      setCartContent([])
    }
    else {
      localStorage.setItem('cartContent', JSON.stringify(cartContent))
      setCartContentNum(cartContent.length)
    }
}, [cartContent])

  return(
    <AppContext.Provider value={{ casename, setCasename, cartContentNum, setCartContentNum, cartContent, setCartContent, user, setAuthID_admin, authID_admin, setAuthSub, setup, setSetup }}>
      <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Navbar />
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