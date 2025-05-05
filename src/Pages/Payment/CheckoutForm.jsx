import React, { useEffect, useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { FaRegCreditCard } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoIosPricetags } from "react-icons/io";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';
import useAuth from '../../Hooks/useAuth';

const CheckoutForm = () => {
  const stripe = useStripe();
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const {user} = useAuth();

  useEffect( () => {
    axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
    })
  }, [axiosSecure, totalPrice])

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const elementStyle = {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: 'sans-serif',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#e53e3e',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
  
    // Start the payment process
    setProcessing(true);
    setError('');
    setSuccess('');
  
    // Make sure Stripe.js and Elements have loaded
    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setProcessing(false);
      return;
    }
  
    // Get the card number element from the form
    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setError('Card number field is missing.');
      setProcessing(false);
      return;
    }
  
    // Create a payment method using the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumber,
    });
  
    if (error) {
      // If there's an error (like invalid card), show message to user
      setError(error.message);
      setProcessing(false);
    } else {
      // Payment method created successfully
      setSuccess('Payment method created successfully!');
      console.log('PaymentMethod:', paymentMethod);
      // You can now send `paymentMethod.id` to your server for further processing
      setProcessing(false);
    }

    //confirm payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardNumber,
            billing_details:{
                email: user.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if(confirmError){
        console.log('error: ', confirmError)
    }else{
        console.log('payment intent: ', paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);
            Swal.fire('Success', 'Transaction successful! Payment Complete', 'success');
            
            //now to save the payment info in the database:
            const payment = {
                email: user.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartIds: cart.map(item => item._id),
                menuItemIds: cart.map(item => item.menuId),
                status: 'pending'
            }
            const res = await axiosSecure.post('/payments', payment);
            console.log( 'payment info saved: ', res.data);
        }
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full mx-auto p-6 rounded-lg shadow-md"
    >
      {/* total */}
      <p className='text-sm mb-10 flex items-center gap-2'> <IoIosPricetags className='text-green-600'/> Total Price: ${totalPrice}</p>
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <div className="flex items-center border rounded p-3">
          <FaRegCreditCard className="text-gray-500 mr-3 transition duration-300 hover:text-orange-500 hover:scale-110" />
          <CardNumberElement options={{ style: elementStyle }} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <div className="flex items-center border rounded p-3">
            <MdDateRange className="text-gray-500 mr-3 text-2xl transition duration-300 hover:text-orange-500 hover:scale-110" />
            <CardExpiryElement options={{ style: elementStyle }} className="w-full" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <div className="flex items-center border rounded p-3">
            <RiLockPasswordLine className="text-gray-500 mr-3 text-2xl transition duration-300 hover:text-orange-500 hover:scale-110" />
            <CardCvcElement options={{ style: elementStyle }} className="w-full" />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      {transactionId && <p className='text-green-500 text-sm'>Transaction Id: {transactionId}</p> }

      <button
        type="submit"
        disabled={!stripe || processing || !clientSecret}
        className="w-full py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
      >
        {processing ? 'Processing...' : 'Pay with Stripe'}
      </button>
    </form>
  );
};

export default CheckoutForm;


/*

 *When you use multiple split elements (CardNumberElement, CardExpiryElement, CardCvcElement) inside the same <Elements> provider:
 *All three inputs are actually internally connected by Stripe.
 *So when you pass just the CardNumberElement to stripe.createPaymentMethod, Stripe automatically collects the values from all the related elements (number, expiry, and CVC) because they’re part of the same Elements context.
 
 in depth:
 elements.getElement(CardNumberElement) returns a reference to the entire card form, 
 not just the number. Stripe’s SDK knows that the expiry and CVC fields are mounted 
 and logically grouped with the card number. So it collects and validates them as a unit when creating the payment method.
 
 why useEffect for calling /create-payment-intent api? because its not a query. Its a mutation—every time you call it you create a new Intent on Stripe’s side. You don’t want it cached or refetched automatically.
 Now, every time your checkout component renders (e.g., every time the total price changes), you need a fresh Payment Intent from Stripe.
 A Payment Intent is a Stripe object that represents a single attempt to collect a payment.
 
 When you create it, you tell Stripe:
    -How much you’re charging (in cents)
    -Which currency
    -What payment methods are allowed (e.g. cards)
 Stripe responds with a client_secret, a one‑time token that your frontend uses to confirm the payment.

 You need that client_secret before the user clicks “Pay”
 By doing it in a useEffect that watches [totalPrice], you ensure:
    -As soon as your form is ready, you fire POST /create-payment-intent
    -Stripe gives you a new intent (and fresh client_secret) for exactly that amount
    -You store it in state so your later stripe.confirmCardPayment(client_secret, …) knows which intent to confirm

***Because you’re creating something on Stripe’s servers, it’s a mutation, not a simple cacheable GET.
*/
