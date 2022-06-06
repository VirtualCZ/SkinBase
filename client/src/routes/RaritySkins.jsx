import { useState, useEffect } from "react"
import Axios from "axios"
const RaritySkins = () => {
    const [CaseContent, setCaseContent] = useState([])

    useEffect(() => {
      Axios.get(`http://localhost:3030/api/getItemsByType/SMG`).then((response)=> {
        setCaseContent(response.data);
      })
    }, [])
  
    return(
    <div className="flex justify-center text-white">
        <div className="flex justify-center w-3/5">
            <div className="w-[100%]">
                <div className="py-[6.5rem] flex justify-center text-gray-300">
                </div>
            </div>
        </div>
    </div>
    )
}
export default RaritySkins