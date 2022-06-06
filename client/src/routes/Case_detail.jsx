import {useLocation} from 'react-router-dom'
import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import ItemCard from "../components/ItemCard";

const Case_detail = () => {
  const params = useLocation();
  const route = params.pathname
  const [Case, setCase] = useState("")
  const [CaseContent, setCaseContent] = useState([])
  const {casename} = useContext(AppContext)
  const {setCasename} = useContext(AppContext)

  if (casename == null | casename == "")
  {
      setCasename(route.replace("/Cases/", ""))
      console.log("route" + casename)
  }
  else
  {
      setCasename(casename.replace("_", " ").replace("_", " "))
      console.log("context" + casename)
  }

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCaseContent/${casename.replace(" ", "_").replace(" ", "_")}`).then((response)=> {
      setCaseContent(response.data);
    })
  }, [casename])

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCase/${casename.replace(" ", "_").replace(" ", "_")}`).then((response)=> {
      setCase(response.data[0]);
      console.log(response.data)
    })
  }, [casename])

  return(
    <div className="flex justify-center text-white">
      <div className="flex justify-center w-3/5">
        <div className="w-[100%]">
          <div className="py-[6.5rem] flex justify-center text-gray-300">
            <img src={Case.caseimage} className="w-[22%] h-[22%] mx-3 rounded-cool-sm "/>
            <span className="my-auto text-center">
              <p className=" text-4xl whitespace-nowrap py-0.5 mx-3">{casename} Case Skins</p>
              <p className=" text-xl whitespace-nowrap py-0.5 mx-3">{Case.caseprice} Tokens</p>
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
export default Case_detail