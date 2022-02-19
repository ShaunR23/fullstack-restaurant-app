import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import Order from "./Order";
import MENU from "./MenuItems";
import Header from "../styling/Header";
import Cookies from "js-cookie";
import Admin from "./Admin";


function App({adminOrders, customerName, setCustomerName}) {
  const [menu, setMenu] = useState(null);
  const [total, setTotal] = useState(0);
  const [newOrder, setNewOrder] = useState([]);
  const [selection, setSelection] = useState('menuScreen');

  const handleError = (err) => {
    console.warn(err)
  }

  const payNow = async () => {
    const orders = {
      customer_name: customerName,
      item: newOrder,
      price: total,
      active: true,

    }
  

  const options = {
    method:"POST",
    headers: {
      "Content-type": "application/json",
      "X-CSFRToken": Cookies.get('csrftoken')
    },
    body: JSON.stringify(orders),
  }

  const response = await fetch("/items/orders/", options).catch(handleError)

  if(!response.ok){
    throw new Error("Network response was not OK")
  }

  setTotal(0);
  setNewOrder([]);
  setCustomerName('Customer');
  selection('menuScreen');
}

  useEffect(() => {
    const getItem = async () => {
      const response = await fetch('/items/').catch(handleError);
      if(!response.ok){
        throw new Error ('Network response was not OK!')   
      } else {
        console.log('data', 'what')
        const data = await response.json();
        console.log('data', data)
        setMenu(data);
        }
      }
      getItem();
    }, []);

  if(!menu) {
    return <div>Fetching data...</div>
  }
  const typeTaco = menu.filter((menu) => menu.type === "Entree/Taco");

  const typeSteak = menu.filter((menu) => menu.type === "Entree/Steak");

  const typeSide = menu.filter((menu) => menu.type === "Side");

  const typeDessert = menu.filter((menu) => menu.type === "Dessert");

  const order = (item, price) => {
    console.log(item, price)
    const newOrderItem = {
      item,
      price,
    };
    setNewOrder([...newOrder, newOrderItem]);
  };
  const subtotal = (price) => {
    setTotal(total + price);
  };

  const orderDisplay = newOrder.map((item) => (
    <Order {...item} order={order} subtotal={subtotal} />
  ));

  const tacoDisplay = typeTaco.map((menu) => (
    <MenuList Key={menu.id} {...menu} subtotal={subtotal} order={order} />
  ));

  const steakDisplay = typeSteak.map((menu) => (
    <MenuList Key={menu.id} {...menu} subtotal={subtotal} order={order} />
  ));

  const sidesDisplay = typeSide.map((menu) => (
    <MenuList Key={menu.id} {...menu} subtotal={subtotal} order={order} />
  ));

  const dessertDisplay = typeDessert.map((menu) => (
    <MenuList Key={menu.id} {...menu} subtotal={subtotal} order={order} />
  ));

  const menuScreen = (
    <>
      <p>Your Total is ${total}.00</p>
      <button onClick={() => setSelection('myOrder')}>Your Order</button>
      <div class="row">
        <h2>Tacos</h2>
        <div id="Tacos" class="display col-md-6 col-lg-3">
          {tacoDisplay}
        </div>
        <h2>Steaks</h2>
        <div id="Steaks" class="display col-md-6 col-lg-3">
          {steakDisplay}
        </div>
        <h2>Sides</h2>
        <div id="Sides" class="display col-md-6 col-lg-3">
          {sidesDisplay}
        </div>
        <h2>Dessert</h2>
        <div id="Desserts" class="display  col-md-6 col-lg-3">
          {dessertDisplay}
        </div>
        <button type='button' name='admin' className='adminButton' onClick={adminOrders} >Get Admin</button>
      </div>
    </>
  );

  // const payNow = () => {
  //   if (localStorage.getItem("orders")) {
  //     var orders = JSON.parse(localStorage.getItem("orders"));
  //     orders.push(newOrder);
  //   } else {
  //     var orders = [newOrder];
  //   }

  //   localStorage.setItem("orders", JSON.stringify(orders));

  //   setTotal(0);
  //   setNewOrder([]);
  //   setScreen(false);
  // };
  const myOrder = (
    <>
      <div class="order-display">
        {orderDisplay}
        Your total is ${total}.00
        <button type="button" onClick={payNow}>
          Pay Now
        </button>
      </div>
    </>
  );

  return (
    <>
      <Header setSelection={setSelection} />


        {selection == 'menuScreen' ? menuScreen : null}
        {selection == 'myOrder' ? myOrder : null}
        {selection == 'admin' ? <Admin />: null}
    </>
  );
}

export default App;
