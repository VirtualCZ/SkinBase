import Axios from "axios";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import App, { AppContext } from "./App";

import AuthenticationButton from "./components/AuthenticationButton"
import Setup from "./components/Setup";

const navigation_array = [
    { name: '🏠', to: "/"},
    { name: 'Knives', to: "/Knife" },
    { name: 'Pistols', to: "/Pistol" },
    { name: 'Rifles', to: "/Rifle" },
    { name: 'SMGs', to: "/SMG" },
    { name: 'Heavy', to: "/Heavy" },
  ]

const Navbar = (props) => {
    const [Cases, setCases] = useState([])
    const {setCasename} = useContext(AppContext)
    const {cartContentNum} = useContext(AppContext)

    useEffect(() => {
        Axios.get(`http://localhost:3030/api/getCases`).then((response)=> { 
            setCases(response.data);
        })
    }, []) 

    return (
        <>
            <Setup/>
        <div className=" flex justify-center pb-7 relative z-10">
        <div className="bg-card text-white rounded-b-cool mb-1.5 w-3/5 h-[100%] flex justify-center">
            <img src="/src/logo.png"/>
            <div className="flex flex-row translate-y-[50%] justify-center items-center w-[100%] h-[100%]">
                {navigation_array.map(item => (
                    <Link className="hover:bg-background p-3 rounded-cool-sm" key={item.to} to={item.to}>{item.name}</Link>
                ))}
                <div class="dropdown">
                    <button class="dropbtn">
                        <Link to="Cases">Cases</Link>
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content h-[25rem] overflow-auto">
                        {Cases.map(item => (
                            <Link to={`Cases/${item.casename.replace(" ", "_").replace(" ", "_")}`} key={item.casename} onClick={()=>setCasename(item.casename)}>{item.casename}</Link>
                        ))}
                    </div>                
                </div>
                <Link 
                        className="hover:bg-background p-3 rounded-cool-sm" 
                        to="/Cart"
                    >
                        🛒 {`(${cartContentNum})`}
                </Link>    
            </div>
        </div>

            <div className="bg-card text-white rounded-b-cool mb-1.5 flex justify-center p-3 fixed right-9">                
                <AuthenticationButton />
            </div>
        </div>
        </>
      );
}
export default Navbar