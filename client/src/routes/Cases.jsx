import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

import ReactPaginate from 'react-paginate';
import { useContext } from "react";
import { AppContext } from "../App";

const Cases = () => {
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(15);
  const [pageCount, setPageCount] = useState(0)
  const [showInsert, setShowInsert] = useState(false)
  const [showInsertButton, setShowInsertButton] = useState(false)
  const {setup} = useContext(AppContext)

  const [NewCasePrice, setNewCasePrice] = useState()
  const [NewCaseImg, setNewCaseImg] = useState()
  const [NewCaseName, setNewCaseName] = useState()

  const submitCase = () => {
    if (NewCaseImg != "" && NewCaseImg != undefined && NewCaseImg != null && NewCasePrice != "" && NewCasePrice != undefined && NewCasePrice != null && NewCaseName != "" && NewCaseName != undefined && NewCaseName != null)
    {Axios.post("http://localhost:3030/api/insertCase", {
        name: NewCaseName,
        img: NewCaseImg,
        price: parseInt(NewCasePrice)
    })
    setNewCasePrice(0)
    setNewCaseImg("")
    setNewCaseName("")}
  }

  const getData = async() => {
    const res = await Axios.get(`http://localhost:3030/api/getCases`)
    const data = res.data;
              const slice = data.slice(offset, offset + perPage)
              const postData = slice.map(item => 
                <ItemCard 
                  key = {item.idcase}
                  idcase = {item.idcase}
                  casename = {item.casename}
                  skinname = {item.casename} 
                  skinimage = {item.caseimage}
                  price = {item.caseprice}
                  cardtype = "case"
                />
              )
              setData(postData)
              setPageCount(Math.ceil(data.length / perPage))
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1)
  };

  useEffect(() => {
    // if(setup === 2) {setShowInsertButton(true)} else {setShowInsertButton(false)}
    getData()
  }, [offset])

    return(
    <div className="flex justify-center text-white">
      <div className="flex justify-center w-3/5">
        <div className="w-[100%]">
          <div className="py-[6.5rem] flex justify-center text-gray-300">
            <span className="my-auto text-center">
              <p className=" text-4xl whitespace-nowrap py-0.5">Skin Cases</p>
            </span>
          </div>

            {setup === 2 &&
              <div className="justify-center flex">
                <button className="mt-3 bg-buy p-1 rounded-cool-sm" onClick={() => setShowInsert(!showInsert)}>Insert</button>
              </div>
            }
            {showInsert && 
              <div className="justify-center flex mt-4">
                <div className="flex flex-col bg-card p-4 rounded-cool">
                  <div className="flex my-2">
                    <p className="mr-auto pr-4">Case name</p>
                    <input className=" ml-auto text-black" value={NewCaseName} onChange={(e)=>{setNewCaseName(e.target.value)}}/>
                  </div>
                  <div className="flex my-2">
                    <p className="mr-auto pr-4">Case image</p>
                    <input className=" ml-auto text-black" value={NewCaseImg} onChange={(e)=>{setNewCaseImg(e.target.value)}}/>
                  </div>
                  <div className="flex my-2">
                    <p className="mr-auto pr-4">Case price</p>
                    <input className=" ml-auto text-black" value={NewCasePrice} onChange={(e)=>{setNewCasePrice(e.target.value.replace(" ", "").replace(/\D/g,''))}}/>
                  </div>
                  <button className="mt-3 bg-buy p-1 rounded-cool-sm" onClick={()=>submitCase()}>Complete setup</button>
                </div>
              </div>
            }

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
export default Cases