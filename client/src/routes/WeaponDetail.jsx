import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom'
import Axios from "axios";
import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { AppContext } from "../App";
import RarityBox from "../components/RarityBox";
const WeaponDetail = () => {
    const params = useLocation();
    const route = params.pathname
    const [SkinsArr, setSkinsArr] = useState([])
    const [SkinImg, setSkinImg] = useState("")
    const [Color, setColor] = useState("")

    const {cartContentNum} = useContext(AppContext)
    const {setCartContentNum} = useContext(AppContext)
    const {cartContent} = useContext(AppContext)
    const {setCartContent} = useContext(AppContext)

    useLayoutEffect(() => {
        const skinID = (decodeURI(route).replace(/(skin)/i, '').replace(/\//g, ''))
        Axios.get(`http://localhost:3030/api/getItemsBySkinID/${skinID}`).then((response)=> {
            setSkinsArr(response.data);
            setSkinImg(response.data[0])
            // console.log(response.data[0])
        })
    }, [])

    useLayoutEffect(()=>{
        if (SkinImg.rarity_name == "Consumer Grade"){
            setColor("bg-[#B0C3D9] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Industrial Grade"){
            setColor("bg-[#5E98D9] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Mil-Spec"){
            setColor("bg-[#4B69FF] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Restricted"){
            setColor("bg-[#8847FF] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Classified"){
            setColor("bg-[#D32EE6] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Covert"){
            setColor("bg-[#EB4B4B] rounded-cool-sm")
        }
        else if (SkinImg.rarity_name == "Special"){
            setColor("bg-[#FFD700] rounded-cool-sm")
        }
    }, [SkinImg])

    const addToCart = (item) => {
        setCartContentNum(cartContentNum + 1)
        setCartContent([
            ...cartContent,
            {
                key: Date.now(),
                name: item.skinname,
                image: item.skinimage,
                wear: item.wear_name,
                rarity: item.rarity_name,
                type: item.name,
                price: item.price
            }
          ])
    }
    
    return(
        <div className="flex justify-center text-white">
            <div className="flex justify-center w-3/5">
                <div className="w-[100%]">
                    <div className=" text-3xl flex ml-auto mr-auto justify-center w-[40%]">
                        <p>
                            {SkinImg.skinname}
                        </p>
                    </div>
                    <div className="grid grid-cols-2">
                        {/* Skin picture */}
                        <div className="font-bold text-center bg-card w-[95%] m-[2.5%] rounded-cool p-4">
                            <RarityBox style={Color} rarity_name={SkinImg.rarity_name} />
                            <img src={SkinImg.skinimage} className="w-[100%] rounded-cool-sm mt-3"/>
                        </div>
                        {/* Buy options, conditions, ... */}
                        <span
                            className="font-bold text-center bg-card h-[95%] w-[95%] m-[2.5%] rounded-cool"
                        >
                            {SkinsArr.map(item => (
                                <div className=" bg-cardWear rounded-cool m-3 flex p-2" key={item.wear_name}>
                                    <div className="flex-grow">                                    
                                        <p className="hover:underline">{item.wear_name}</p>
                                        <p className="hover:underline">Price: {item.price} Tokens</p>
                                    </div>
                                    <button className="bg-buy rounded-cool px-2" onClick={() => addToCart(item)}>Add to cart</button>
                                </div>
                            ))}
                            <div className="bg-cardWear rounded-cool m-3 flex p-2">
                                <img src={SkinImg.caseimage} className="h-40 rounded-cool-sm"/>
                                <div className="flex-col flex-grow self-center">
                                    <p className="">{SkinImg.casename} case</p>
                                    <a href={"/Cases/" + SkinImg.casename}>
                                        <button className="bg-buy rounded-cool px-2 py-2 mt-3">Show more</button>
                                    </a>
                                </div>
                            </div>
                        </span>
                        
                    </div>
                </div>
            </div>
      </div>
    )
}
export default WeaponDetail