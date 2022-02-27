import Cookies from "js-cookie";
import { useState } from "react";
import App from "./App"
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";




function Admin(props){
    const [activeOrder, setActiveOrder] = useState([])
    
    const handleError = (err) => {
        console.warn(err)
      }

   
    
    const completeOrder = async (pk, customerName, newOrder, total) => {
        const completeOrders = {
            customer_name: customerName,
            item: newOrder,
            price: total,
            active: false,
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSFRToken': Cookies.get('csrftoken'),
            
            },
            body: JSON.stringify(completeOrders)
        }

        const response = await fetch('items/orders/${pk}/', options).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const updatedOrderStatus = activeOrder.map((order) => {
            if (order.id == pk){
                return {...order, active: false}
            } else {
                return {...order}
            }
        })
        setActiveOrder(updatedOrderStatus)
    }

    const cancelOrder = async () => {
        const options = {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
                'X-CSFRToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch('/orders/', options).catch(handleError)
        if (!response.ok) {
            throw new Error ('Network was not OK');
        }
    }

    const filterActiveOrder = activeOrder.filter(order => (
        order.active == true
    ))

    const filterCompletedOrder = activeOrder.filter(order => (
       order.active == false 
    ))

    
    const adminDisplayActive = filterActiveOrder.map(order => (
       <ActiveOrders key={order.id} {...order} completeOrder={completeOrder} />
    ));
    const adminDisplayCompleted = filterCompletedOrder.map(order => (
       <CompletedOrders  key={order.id} {...order} />
    ));

  

    return (
        <>
        <h3 className='adminDisplay col-12'>Active/Completed Orders</h3>
        <div class='row adminContainer'>
        <h3 className='menuOrderDisplay col-6'>Active Orders</h3>
        <h3 className='menuOrderDisplay col-6'>Completed Orders</h3>
        </div>
        <div className='col-6'>{adminDisplayActive}</div>
        <div className='col-6'> {adminDisplayCompleted}</div>
        {/* <button type='button' name='admin' className='adminButton' onClick={adminOrders} >Get Admin</button> */}
        
        
        </>
    )
}


export default Admin