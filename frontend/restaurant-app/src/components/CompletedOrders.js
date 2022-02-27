function CompletedOrders({ customer}) {

    return (
        <div className='row'>
            <div className="orderlist col-6">
                <p className='orderDisplay'>{customer}</p>
            </div>
        </div>
    );
}

export default CompletedOrders;

