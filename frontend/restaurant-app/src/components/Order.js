import { useState } from "react";
import MenuList from "./MenuList";
import App from "./App";

function Order(props){
  const {item, price, total, setTotal } = props;
  console.log(props)
  const subtotal = (price) => {
    setTotal(total + price)
  };

  
    
    return (
      <div>
        <p>{item} ${price}.00</p>
        </div>
      );
    
}

export default Order;