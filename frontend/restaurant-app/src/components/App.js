import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import Order from "./Order";
import MENU from "./MenuItems";
import Header from "../styling/Header";
import Cookies from "js-cookie";
import Admin from "./Admin";
import Button from "react-bootstrap/Button"


function App({activeOrder, setActiveOrder }) {
  const [menu, setMenu] = useState(null);
  const [total, setTotal] = useState(0);
  const [newOrder, setNewOrder] = useState([]);
  const [customerName, setCustomerName] = useState('Customer')
  const [customerValue, setCustomerValue] = useState('')

  const [selection, setSelection] = useState('menuScreen');

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

  const handleError = (err) => {
    console.warn(err)
  }

  const payNow = async () => {
    const orders = {
      customer_name: customerName,
      items: newOrder,
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
  // setSelection('menuScreen');
}

  

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

  const adminOrders = () => {
    const getOrders = async() =>{
        const response = await fetch('/items/orders').catch(handleError);
        if(!response.ok) {
            throw new Error('Network response was not OK!')
        }else{
            const data = await response.json();
            setActiveOrder(data);
        }
    }

    getOrders();

    setSelection('admin')

    if(!activeOrder) {
        return <div>Fetching data...</div>
    }
}

const addCustomerName = (e) => {
  setCustomerName(e.target.value)
  setCustomerValue(e.target.value)
}

const submitName = (e) => {
  e.preventDefault();
  setCustomerValue('')
}

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

  const myOrder = (
    <>
      <div class="order-display">
        <h3>{orderDisplay}</h3>
        <h4>Your total is</h4>
         <h6>${total}.00</h6>
         <form className="col" onSubmit={submitName}>
                <input type='text' name="customerName" className='customerName' placeholder='Order Name' value={customerValue} onChange={addCustomerName} required></input>
                <button type='submit' name="submit" className='customerNameSubmit'>Submit Order Name</button>
          </form>
          <div>
          <Button type="button" onClick={payNow}>Pay Now
        </Button>
        </div>
          <form>
        
          
        <button type="button" onClick={() => setSelection('menuScreen')} >
          Back to Menu
        </button>
        <button type='button' name='admin' className='adminButton' onClick={adminOrders} >Get Admin</button>
        </form>
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
