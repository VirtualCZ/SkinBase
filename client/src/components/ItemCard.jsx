import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import RarityBox from "./RarityBox";

const ItemCard = (props) => {
    let link = null
    if (props.idskin == null || props.idskin == "")
    {
        link = "/Cases/" + props.casename
    }
    else
    {
        link = "/Skin/" + props.idskin
    }
    const [Color, setColor] = useState("")
    useLayoutEffect(()=>{
        if (props.rarity_name == "Consumer Grade"){
            setColor("bg-[#B0C3D9] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Industrial Grade"){
            setColor("bg-[#5E98D9] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Mil-Spec"){
            setColor("bg-[#4B69FF] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Restricted"){
            setColor("bg-[#8847FF] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Classified"){
            setColor("bg-[#D32EE6] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Covert"){
            setColor("bg-[#EB4B4B] rounded-cool-sm my-2")
        }
        else if (props.rarity_name == "Special"){
            setColor("bg-[#FFD700] rounded-cool-sm my-2")
        }
    }, [props])
    return(
        <Link to={link}
            key={props.iditem}
            className="font-bold text-center bg-card h-[95%] w-[95%] m-[2.5%] rounded-cool p-5"
        >
            <p className="hover:underline">{props.skinname}</p>
            <RarityBox style={Color} rarity_name={props.rarity_name} />
            {/* <button className=" bg-green-900 my-2 w-[100%] rounded-cool-sm hover:underline">{props.rarity_name}</button> */}
            <img className="w-[100%] rounded-cool-sm" src={props.skinimage} />
            <p className="hover:underline">{props.price}</p>
            <p className="hover:underline">{props.wear_name}</p>
        </Link>
    )
}
export default ItemCard