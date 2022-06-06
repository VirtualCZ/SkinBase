import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

const Account = () => {
  const [CaseContent, setCaseContent] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCaseContent/Rudna`).then((response)=> {
      setCaseContent(response.data);
    })
  }, [])

  console.log(CaseContent)

    return(
    <div className="flex justify-center text-white">
      <div className="flex justify-center w-3/5">
        <div className="w-[100%]">
          <div className="py-[6.5rem] flex justify-center text-gray-300">
            <img src="/src/images/DnD.png"/>
            <span className="my-auto text-center">
              <p className=" text-4xl whitespace-nowrap py-0.5">Dreams & Nightmares Case</p>
              <p className=" text-xl whitespace-nowrap py-0.5">Dreams & Nightmares Collection Skins</p>
            </span>
          </div>
          <div className="grid grid-cols-3">
            {CaseContent.map(item => (
              <ItemCard 
                key = {item.iditem}
                idskin = {item.idskin}
                skinname = {item.skinname} 
                rarity_name = {item.rarity_name}
                skinimage = {item.skinimage}
                price = {item.price}
                wear_name = {item.wear_name}
              />
            ))}

            <span className=" bg-card h-[35rem] w-[95%] mx-[2.5%] rounded-cool">

            </span>
            <span className=" bg-card h-[35rem] w-[95%] mx-[2.5%] rounded-cool">

            </span>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Account