function ActiveOrders({ customer_name,item, price, completeOrder }) {


    const updateOrderStatus = () => {
       
        const orderName = customer_name;
        const orderItem = item
        const orderTotal = price

        completeOrder(orderName, orderItem, orderTotal)
    }

    return (
        <div className='row'>
            <div className="orderlist col-6">
                <p className='orderDisplay'>{customer_name}
                    <span className='completed'><button type='button' onClick={updateOrderStatus}>Completed</button></span>
                </p>
            </div>
        </div>
    );
}

export default ActiveOrders;