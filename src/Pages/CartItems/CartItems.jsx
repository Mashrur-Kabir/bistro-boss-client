import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useCart from '../../Hooks/useCart';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const CartItems = () => {
  
  const [cart, refetch] = useCart();

  //total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  
  const axiosSecure = useAxiosSecure();

  //handle delete
  const onDelete = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove "${item.name}" from the cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        // delete operation here
        axiosSecure.delete(`/carts/${item._id}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            console.log('Deleting item:', item);
            Swal.fire(
              'Deleted!',
              `"${item.name}" has been removed from your cart.`,
              'success'
            );
            refetch();
          }
        })
      }
    });
  }

  return (
    <div className="px-6 py-10 bg-gray-100 overflow-auto font-quicksand container mx-auto">
      {/* Header */}
      <SectionTitle heading="YOUR CART ITEMS" subheading="Here are" />

      {/* Table Container */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        {/* Totals and PAY */}
        <div className="flex justify-evenly items-center flex-wrap text-center gap-4 mb-6">
          <div>
            <p className="font-semibold font-tang text-4xl">Total Orders: {cart.length}</p>
          </div>
          <div>
            <p className="font-semibold font-tang text-4xl">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          {/* conditional link and button for payment */}
          {
            cart.length ? 
            <Link to='/dashboard/payment'>
              <button className="relative text-2xl w-fit text-yellow-600 font-semibold uppercase tracking-wide group overflow-hidden px-4 border border-yellow-600 rounded-md transition-all duration-500 hover:text-white">
                <span className="absolute inset-0 bg-yellow-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                <span className="relative z-10">Pay</span>
              </button>
            </Link>
            :
            <button disabled className="relative text-2xl w-fit text-gray-500 font-semibold uppercase tracking-wide group overflow-hidden px-4 border border-gray-500 rounded-md transition-all duration-500 hover:text-white">
              <span className="absolute inset-0 bg-gray-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              <span className="relative z-10">Pay</span>
            </button>
          }
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="w-full text-left divide-y divide-gray-200">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">ITEM IMAGE</th>
                <th className="p-4">ITEM NAME</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">DELETE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {cart.length > 0 ? (
                cart.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={item.menuImage || '/placeholder.png'}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    No items to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
