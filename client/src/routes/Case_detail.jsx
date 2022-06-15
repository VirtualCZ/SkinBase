import {useLocation, useParams} from 'react-router-dom'
import Axios from "axios";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { AppContext } from "../App";
import ItemCard from "../components/ItemCard";

import ReactPaginate from 'react-paginate';

const Case_detail = () => {
  const params = useLocation();
  const route = params.pathname
  const url = useParams()
  const [Case, setCase] = useState("")
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(15);
  const [pageCount, setPageCount] = useState(0)
  const {casename} = useContext(AppContext)
  const {setCasename} = useContext(AppContext)

  if (casename == null | casename == "")
  {
      setCasename(route.replace("/Cases/", ""))
  }
  else
  {
      setCasename(casename.replace("_", " ").replace("_", " "))
  }

  useLayoutEffect(() => {
    getData()
  }, [url, location, offset])

  const getData = async() => {
    const res = await Axios.get(`http://localhost:3030/api/getCaseContent/${casename.replace(" ", "_").replace(" ", "_")}`)
    const data = res.data;
                const slice = data.slice(offset, offset + perPage)
                const postData = slice.map(item => 
                <ItemCard 
                  key = {item.iditem}
                  idskin = {item.idskin}
                  iditem = {item.iditem}
                  skinname = {item.skinname} 
                  rarity_name = {item.rarity_name}
                  skinimage = {item.skinimage}
                  price = {item.price}
                  wear_name = {item.wear_name}
                  cardtype = "skin"
                />
                )
                setData(postData)
                setPageCount(Math.ceil(data.length / perPage))
    }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  };

  // nazev a img
  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCase/${casename.replace(" ", "_").replace(" ", "_")}`).then((response)=> {
      setCase(response.data[0]);
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
            {data}
          </div>

          <div className="flex">
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
            </div>

        </div>
      </div>
    </div>
    )
}
export default Case_detail