import { Link } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";

import ReactPaginate from 'react-paginate';
import ReactDOM from 'react-dom';

const Items = () => {
  return(
    
  )
}

const Cases = () => {
  const [Cases, setCases] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getCases`).then((response)=> {
      setCases(response.data);
    })
  }, [])

  useEffect(() => {
    // - pagination - Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(Cases.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(Cases.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // - pagination - Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % Cases.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

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
          <ReactPaginate
            nextLabel = "next >"
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
    )
}

// Add a <div id="container"> to your HTML to see the componend rendered.
ReactDOM.render(
  <PaginatedItems itemsPerPage={4} />,
  document.getElementById('container')
);

export default Cases