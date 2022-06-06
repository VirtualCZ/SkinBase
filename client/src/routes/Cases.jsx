import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

const Cases = () => {
  const [Cases, setCases] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCases`).then((response)=> {
      setCases(response.data);
    })
  }, [])

    return(
    <div className="flex justify-center text-white">
      <div className="flex justify-center w-3/5">
        <div className="w-[100%]">
          <div className="py-[6.5rem] flex justify-center text-gray-300">
            <span className="my-auto text-center">
              <p className=" text-4xl whitespace-nowrap py-0.5">Skin Cases</p>
            </span>
          </div>
          <div className="grid grid-cols-3">
            {Cases.map(item => (
              <ItemCard 
                key = {item.iditem}
                casename = {item.casename}
                skinname = {item.casename} 
                skinimage = {item.caseimage}
                price = {item.caseprice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}
export default Cases