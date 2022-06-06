import { useState, useLayoutEffect } from "react"
const RarityBox = (props) => {
    return(
        <p className={props.style}>{props.rarity_name}</p>
    )
}
export default RarityBox