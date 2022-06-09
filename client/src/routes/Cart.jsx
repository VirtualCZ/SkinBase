import { useContext, useEffect, useLayoutEffect, useState } from "react"
import { AppContext } from "../App"
import RarityBox from "../components/RarityBox"

const Cart = () => {
    const {cartContentNum} = useContext(AppContext)
    const {setCartContentNum} = useContext(AppContext)
    const {cartContent} = useContext(AppContext)
    const {setCartContent} = useContext(AppContext)
    const [showitems, setShowitems] = useState(false)

    const rarityFunc = (item) => {
        if (item.rarity == "Consumer Grade"){
            return("text-[#B0C3D9]")
        }
        else if (item.rarity == "Industrial Grade"){
            return("text-[#5E98D9]")
        }
        else if (item.rarity == "Mil-Spec"){
            return("text-[#4B69FF]")
        }
        else if (item.rarity == "Restricted"){
            return("text-[#8847FF]")
        }
        else if (item.rarity == "Classified"){
            return("text-[#D32EE6]")
        }
        else if (item.rarity == "Covert"){
            return("text-[#EB4B4B]")
        }
        else if (item.rarity == "Special"){
            return("text-[#FFD700]")
        }
    }

    const handleRemove = (key) => {
        const newContent = cartContent.filter((item) => item.key !== key);
        setCartContentNum(cartContentNum - 1)
        setCartContent(newContent);
      };

    useLayoutEffect(() => {
        if (cartContent.length != 0){
            setShowitems(true)
        }
        else{
            setShowitems(false)
        }
    }, [cartContent])

    return(
        <div className="flex justify-center text-white">
            <div className="flex justify-center w-3/5">
                <div className="w-[100%]">

                    <div className="flex bg-card rounded-cool p-5 my-[1.5%] items-center text-xl">
                        <div className="w-40">
                            <p className="text-white px-1 flex-1 text-center">Image</p>
                        </div>
                        <div className="flex-grow grid grid-cols-5">
                            <p className="text-white px-1 flex-1 text-center">Name</p>
                            <p className="text-white px-1 flex-1 text-center">Wear</p>
                            <p className="text-white px-1 flex-1 text-center">Rarity</p>
                            <p className="text-white px-1 flex-1 text-center">Type</p>
                            <p className="text-white px-1 flex-1 text-center">Price</p>
                        </div>
                        <p className="text-card p-1 ml-auto rounded-cool-sm">Remove</p>
                    </div>

                    {showitems && cartContent.map(item => (
                        <div className="flex bg-card rounded-cool p-5 my-[1.5%] items-center text-xl" key={item.key}>
                            <img className="rounded-cool-sm w-40" src={item.image}/>
                            <div className="flex-grow grid grid-cols-5">
                                <p className="text-white px-1 flex-1 text-center">{item.name}</p>
                                <p className="text-white px-1 flex-1 text-center">{item.wear}</p>
                                <RarityBox style={`text-center + ${rarityFunc(item)}`} rarity_name={item.rarity}/>
                                <p className="text-white px-1 flex-1 text-center">{item.type}</p>
                                <p className="text-white px-1 flex-1 text-center">{item.price}</p>
                            </div>
                            <button className="text-white p-1 ml-auto bg-red-600 rounded-cool-sm" onClick={() => handleRemove(item.key)}>Remove</button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
export default Cart