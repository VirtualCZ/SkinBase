import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

import ReactPaginate from 'react-paginate';

const Cases = () => {
  const [data, setData] = useState([])
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(15);
  const [pageCount, setPageCount] = useState(0)

  const getData = async() => {
    const res = await Axios.get(`http://localhost:3030/api/getCases`)
    const data = res.data;
              const slice = data.slice(offset, offset + perPage)
              const postData = slice.map(item => 
                <ItemCard 
                  key = {item.iditem}
                  casename = {item.casename}
                  skinname = {item.casename} 
                  skinimage = {item.caseimage}
                  price = {item.caseprice}
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