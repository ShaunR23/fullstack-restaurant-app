import Cookies from "js-cookie";
import { useState } from "react";
import App from "./App"




function Admin({total, newOrder, order}){
    const [activeOrder, setActiveOrder] = useState([])
    const [customerName, setCustomerName] = useState('')

    const handleError = (err) => {
        console.warn(err)
      }

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

        if(!activeOrder) {
            return <div>Fetching data...</div>
        }
    }

    
    const completeOrder = async (pk, customerName, newOrder, total) => {
        const completeOrders = {
            customer: customerName,
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
        {...order}, completeOrder={completeOrder} 
    ));
    const adminDisplayCompleted = filterCompletedOrder.map(order => (
         {...order} ));

  

    return (
        <>
        <h3 className='adminDisplay'></h3>
        <h3 className='activeOrderDisplay col-6'>Active Orders</h3>
        <h3 className='completedOrderDisplay col-6'></h3>
        <div className='col-6'>{adminDisplayActive}</div>
        <div className='col-6'> {adminDisplayCompleted}</div>
        <button type='button' name='admin' className='adminButton' onClick={adminOrders} >Get Admin</button>
        <button type='button' name='completeButton' className='completeButton' onClick={completeOrder} >Complete Order</button>
        <button type='button' name='cancelButton' className='cancelButton' onClick={cancelOrder} >Cancel Order</button>
        </>
    )
}


export default Admin