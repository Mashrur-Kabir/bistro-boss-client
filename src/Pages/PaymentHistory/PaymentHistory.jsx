import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useAuth from '../../Hooks/useAuth';
import { MdHistory } from 'react-icons/md';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiEye } from 'react-icons/fi';
import { useState } from 'react';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuDetails, setMenuDetails] = useState([]);


  const {data: payments = [], refetch, isLoading } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = (item) => {
    Swal.fire({
      title: 'Did You Receive the Item?',
      // use `html` instead of `text` for custom formatting
      html: `
        <p>Confirm 'yes' if you did</p>
        <p style="font-size:0.9em; color:#555; margin-top:0.5em;">
          Confirm transaction Id: <strong>${item.transactionId}</strong><br/>
          to the delivery guy in case we got your order wrong.
        </p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/payments/${item._id}`, { status: 'received' });
        Swal.fire('Updated!', 'Thank you for your Purchase. Please come again.', 'success');
        refetch();
      }
    });
  };  

  const handleViewDetails = async (item) => {
    try {
      const details = await Promise.all(
        item.menuItemIds.map(id =>
          axiosSecure.get(`/menu/${id}`).then(r => r.data)
        )
      );
      setMenuDetails(details);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch menu details:', err);
    }
  };
  

  if (isLoading) return <p>Loading payment history...</p>;

  return (
    <div className="px-6 py-10 bg-gray-100 overflow-auto font-quicksand container mx-auto">
      {/* Header */}
      <SectionTitle heading="PAYMENT HISTORY" subheading="Your Recent Transactions" />

      {/* Table Container */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        {/* Summary Section */}
        <div className="flex justify-evenly items-center flex-wrap text-center gap-4 mb-6">
          <div>
            <p className="font-semibold font-tang text-4xl">Total Payments: {payments.length}</p>
          </div>
          <div className="flex items-center gap-2 text-4xl font-tang text-orange-600">
            <MdHistory />
            <p>History</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="w-full text-left divide-y divide-gray-200">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">EMAIL</th>
                <th className="p-4">PAYMENT TYPE</th>
                <th className="p-4">TOTAL PRICE</th>
                <th className="p-4">DATE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">VIEW DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {payments.length > 0 ? (
                payments.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3 capitalize">{item.paymentType || 'N/A'}</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">
                      ${item.price?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    {/* pending/received */}
                    <td className="px-4 py-3">
                      {item.status === 'pending' ? (
                        <button
                          onClick={() => handleStatusChange(item)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Pending
                        </button>
                      ) : (
                        <span className="px-3 py-1 bg-green-500 text-white rounded">
                          Received
                        </span>
                      )}
                    </td>
                    {/* view item details */}
                    <td className="px-4 py-3 flex justify-center">
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="text-orange-400 hover:text-orange-700 transition"
                        title="View order details"
                      >
                        <FiEye className='text-center' size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* item details modal*/}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white text-black p-6 rounded-xl w-full max-w-xl shadow-lg animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-tang">Order Details</h2>

                <table className="w-full border-collapse">
                    <thead>
                    <tr className='text-orange-500'>
                        <th className="text-left py-2 px-4 border-b border-gray-300">Name</th>
                        <th className="text-left py-2 px-4 border-b border-gray-300">Category</th>
                        <th className="text-right py-2 px-4 border-b border-gray-300">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menuDetails.map((d, idx) => (
                        <tr
                        key={idx}
                        className="hover:bg-gray-100 transition"
                        >
                        <td className="py-2 px-4 border-b border-gray-200">{d.name}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{d.category}</td>
                        <td className="py-2 px-4 border-b border-gray-200 text-right">${d.price.toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="text-right mt-4">
                    <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                    Close
                    </button>
                </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
