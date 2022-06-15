import { useState } from "react"
import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useContext } from "react";
import { AppContext } from "../App";

const Setup = () => {
    const { isAuthenticated } = useAuth0();  
    const { user } = useAuth0();
    const { setup } = useContext(AppContext)
    const { setSetup } = useContext(AppContext)
    const [phone, setPhone] = useState()
    const submitAccount = () => {
        if (phone.match(/\d{9}/))
        Axios.post("http://localhost:3030/api/insertUser", {
            idAuth: user.sub,
            tokens: 100,
            phone: phone
        
        })
        setSetup(1)
    }

    if (isAuthenticated && setup === undefined){
        return(
        <>
            <div className=" left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] justify-center w-[3/5] fixed z-20">
            <div className="flex relative text-white bg-card border-white border-2 p-3 rounded-cool">
                <div className="">
                    <p className="text-4xl">Complete your profile</p>
                    <p className="py-2">Username: {user.nickname}</p>
                    <div className="flex items-center">
                        <p>Phone number:</p>
                        <input className="mx-2 p-1 rounded-cool-sm text-black" value={phone} onChange={(e)=>{
                                setPhone(e.target.value.replace(" ", "").replace(/\D/g,''))
                            }} 
                            placeholder="774 455 738"/>
                    </div>
                    <button className="mt-3 relative left-[50%] translate-x-[-50%] bg-buy p-1 rounded-cool-sm" onClick={()=>{submitAccount()}}>Complete setup</button>
                </div>
            </div>
            </div>

            <div className="w-[100%] h-[100%] opacity-40 bg-black fixed"></div>
        </>
        )
    }
    else{
        return(<div></div>)
    }


}
export default Setup