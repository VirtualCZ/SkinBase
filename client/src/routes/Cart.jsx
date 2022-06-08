import { useContext, useLayoutEffect, useState } from "react"
import { AppContext } from "../App"

const Cart = () => {
    const {cartContentNum} = useContext(AppContext)
    const {setCartContentNum} = useContext(AppContext)
    const {cartContent} = useContext(AppContext)
    const {setCartContent} = useContext(AppContext)
    const [showitems, setShowitems] = useState(false)
    const cartItems=[
        {name: "yayo", pic: "dd", key: "1"},
        {name: "yayo", pic: "dd", key: "2"},
        {name: "yayo", pic: "dd", key: "3"},
        {name: "yayo", pic: "dd", key: "4"}
    ]

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
                    {cartItems.map(item => (
                        <div className="flex bg-card rounded-cool p-5 my-[1.5%]" key={item.key}>
                            <p className="text-white px-1">Img</p>
                            <p className="text-white px-1 flex-1">Name</p>
                            <p className="text-white px-1 flex-1">Wear</p>
                            <p className="text-white px-1 flex-1">Rarity</p>
                            <p className="text-white px-1 flex-1">Type</p>
                            <p className="text-white px-1 flex-1">Price</p>
                            <p className="text-white px-1 ml-auto">❌</p>
                        </div>
                    ))}
                    {showitems && cartContent.map(item => (
                        <div className="flex bg-card rounded-cool p-5 my-[1.5%]" key={item.key}>
                            <p className="text-white px-1">item.image</p>
                            <p className="text-white px-1 flex-1">item.name</p>
                            <p className="text-white px-1 flex-1">item.wear</p>
                            <p className="text-white px-1 flex-1">item.rarity</p>
                            <p className="text-white px-1 flex-1">item.type</p>
                            <p className="text-white px-1 flex-1">item.price</p>
                            <p className="text-white px-1 ml-auto">❌</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Cart