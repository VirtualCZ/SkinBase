import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import RarityBox from "./RarityBox";
import { useContext } from "react";
import { AppContext } from "../App";
import { useEffect } from "react";
import axios from "axios";

const ItemCard = (props) => {
    const { setup } = useContext(AppContext)

    const deletItem = (id) => {
        if (confirm("Are you sure?")){
            console.log(id)
            axios.delete(`http://localhost:3030/api/deleteItem/`, {data: { iditem: id }})
        }
    }
    const deleteCase = (id) => {
        if (confirm("Are you sure?")){
            axios.delete(`http://localhost:3030/api/deleteCase/`, {data: { idcase: id }})
        }
    }

    const [newprice, setNewprice] = useState(props.price)
    const [newSkinname, setNewSkinname] = useState(props.skinname)

    useEffect(()=>{
        // console.log(newprice)
    },[newprice])

    const confirmInsert = () => {
        axios.put(`http://localhost:3030/api/updateItem`, {
            newprice: parseInt(newprice),
            iditem: props.iditem,
            skinname: newSkinname,
            idskin: props.idskin
        })
        if (confirm("Updated")){
            window.location.reload(false)
        }
        else{
            window.location.reload(false)
        }
    }

    const [Edit, setEdit] = useState(false)
    const EditItem = () => {
        return(
            <div className="w-[100%]">
                <p>
                Item name
                </p>
                <input className="text-black mb-2" defaultValue={props.skinname} onChange={(e)=>{setNewSkinname(e.target.value)}} />
                <p>
                    Item price
                </p>
                <input className="text-black mb-2" defaultValue={props.price} onChange={(e)=>{setNewprice(e.target.value)}} /><br></br>
                <button className="mt-3 bg-buy p-1 rounded-cool-sm" onClick={()=>{confirmInsert()}}>Submit</button>
            </div>
        )
    }

    const Admin = () => {
        if (setup === 2 && props.cardtype === "skin"){
            return(
                <div className="flex">
                    <button onClick={() => setEdit(!Edit)} className="m-2 bg-blue-500 py-1 px-3 rounded-cool-sm w-[100%]">Edit</button>
                    <button onClick={() => deletItem(props.iditem)} className="m-2 bg-red-600 py-1 px-3 rounded-cool-sm w-[100%]">Delete</button>
                </div>
            )
        }
        if (setup === 2 && props.cardtype === "case"){
            return(
                <div className="flex">
                    <button onClick={() => deleteCase(props.idcase)} className="m-2 bg-red-600 py-1 px-3 rounded-cool-sm w-[100%]">Delete</button>
                </div>
            )
        }
    }

    useEffect(() => {
        Admin()
    }, [setup])

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
        <div className="font-bold text-center bg-card h-[95%] w-[95%] m-[2.5%] rounded-cool p-5">
        <Link to={link}
            key={props.iditem}
        >
            <p className="hover:underline">{props.skinname}</p>
            <RarityBox style={Color} rarity_name={props.rarity_name} />
            {/* <button className=" bg-green-900 my-2 w-[100%] rounded-cool-sm hover:underline">{props.rarity_name}</button> */}
            <img className="w-[100%] rounded-cool-sm" src={props.skinimage} />
            <p className="hover:underline">{props.price}</p>
            <p className="hover:underline">{props.wear_name}</p>
        </Link>
        {Admin()}
        {Edit && EditItem()}
        </div>
    )
}
export default ItemCard