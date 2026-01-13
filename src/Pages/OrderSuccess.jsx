import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiHome, FiTruck } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  // In a real app, you'd get this data from your state/API
  const orderDetails = {
    orderId: '#123456',
    date: new Date().toLocaleDateString(),
    total: 129.99,
    estimatedDelivery: 'April 10, 2023',
    items: [
      { id: 1, name: 'Premium Wireless Headphones', quantity: 1, price: 99.99 },
      { id: 2, name: 'Phone Case', quantity: 2, price: 15.00 }
    ]
  };

  return (
    <div className="changer-cursor min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      data-cursor-color="black">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          {/* Success Icon */}
          <div className="flex flex-col items-center mb-6">
            <FiCheckCircle className="h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-2xl font-bold text-gray-900 font-[futura]">Order Confirmed!</h1>
            <p className="mt-2 text-gray-600 font-[futura]">Thank you for your purchase</p>
            <h2 className='text-gray-600 font-[futura]'>This is a demo page not a final build</h2>
          </div>

          {/* Order Summary */}
          <div className="border-t border-b border-gray-200 py-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{orderDetails.date}</span>
            </div>
            
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center text-green-600">
              <FiTruck className="mr-2" />
              <span>Estimated delivery: {orderDetails.estimatedDelivery}</span>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Your Items</h3>
            <ul className="divide-y divide-gray-200">
              {orderDetails.items.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
            >
              <FiHome className="mr-2" />
              Back to Home
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 bg-white hover:bg-gray-50 text-indigo-600 py-2 px-4 border border-indigo-300 rounded-md flex items-center justify-center"
            >
              <FiShoppingBag className="mr-2" />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;