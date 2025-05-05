import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useMenu from '../../Hooks/useMenu';
import { Link } from 'react-router-dom';

const ManageCart = () => {
  const [menu, , refetch] = useMenu();
  const [selectedCategory, setSelectedCategory] = useState('none');
  const axiosSecure = useAxiosSecure();

  // Filter out 'popular' and 'offered' from categories
  const categories = ['none', ...new Set(
    menu
      .map(item => item.category)
      .filter(cat => cat && cat !== 'popular' && cat !== 'offered')
  )];

  // Filtered menu based on selected category
  const filteredMenu = selectedCategory === 'none'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  // Total price
  const totalPrice = filteredMenu.reduce((total, item) => total + item.price, 0);

  // Handle delete
  const onDelete = item => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove "${item.name}" from the cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire(
            'Deleted!',
            `"${item.name}" has been removed from your cart.`,
            'success'
          );
          refetch();
        }
      }
    });
  };

  return (
    <div className="px-6 py-10 bg-gray-100 overflow-auto font-quicksand container mx-auto">
      {/* Header */}
      <SectionTitle heading="CART ITEMS" subheading="Manage your" />

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border
              ${selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-white text-gray-700'}
              hover:bg-orange-500 hover:text-white transition`}
          >
            {category === 'none' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        {/* Totals */}
        <div className="flex justify-evenly items-center flex-wrap text-center gap-4 mb-6">
          <div>
            <p className="font-semibold font-tang text-4xl">Total Orders: {filteredMenu.length}</p>
          </div>
          <div>
            <p className="font-semibold font-tang text-4xl">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
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
                <th className="p-4">EDIT</th>
                <th className="p-4">DELETE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={item.image || '/placeholder.png'}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Link to={`/dashboard/updatecart/${item._id}`}>
                        <button className="p-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
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

export default ManageCart;
