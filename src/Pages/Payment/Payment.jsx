import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg w-full mx-auto px-4 py-12 font-quicksand overflow-auto">
      
      <div className='animate-fadeIn'>
        <SectionTitle heading="PAYMENT" subheading="Complete your order via Stripe" />
      </div>

      <div className="bg-white shadow-lg rounded-xl p-8 mt-8">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

// in frontend: npm install --save @stripe/react-stripe-js @stripe/stripe-js
// we also need to install "npm install --save stripe"
