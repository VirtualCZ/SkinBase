import { Link } from "react-router-dom";

const ItemCard = (props) => {
    let link = null
    if (props.idskin == null || props.idskin == "")
    {
        link = "/Cases/" + props.casename
    }
    else
    {
        link = "/Skin/" + props.idskin
    }
    return(
        <Link to={link}
            key={props.iditem}
            className="font-bold text-center bg-card h-[95%] w-[95%] m-[2.5%] rounded-cool p-5"
        >
            <p className="hover:underline">{props.skinname}</p>
            <button className=" bg-green-900 my-2 w-[100%] rounded-cool-sm hover:underline">{props.rarity_name}</button>
            <img className="w-[100%] rounded-cool-sm" src={props.skinimage} />
            <p className="hover:underline">{props.price}</p>
            <p className="hover:underline">{props.wear_name}</p>
        </Link>
    )
}
export default ItemCard