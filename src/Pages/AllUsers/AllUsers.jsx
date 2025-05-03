import { FaTrash, FaUserShield } from 'react-icons/fa';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { HiOutlineUser } from 'react-icons/hi';

const AllUsers = () => {

  const axiosSecure = useAxiosSecure(); //axiosSecure since nobody should be able to load and see all user data 

  const {refetch, data: users = []} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
        const res = await axiosSecure.get('/users');
        return res.data
    }
  })

  //deleting a user
  const handleDelete = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', `${user.name} has been removed.`, 'success');
            };
            refetch();
          });
      }
    });
  };

  //make a user 'admin'
  const handleMakeAdmin = (user) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to make ${user.name} admin?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                Swal.fire('Role changed!', `${user.name} is now an Admin.`, 'success');
                };
                refetch();
            });
        }
      });
  }


  return (
    <div className="px-6 py-10 bg-gray-100 font-quicksand container mx-auto">
      {/* Section Title */}
      <SectionTitle heading="MANAGE ALL USERS" subheading="Here you can" />

      {/* Table Container */}
      <div className="bg-white shadow rounded-lg p-6">
        {/* Total Users */}
        <p className="font-tang text-4xl font-semibold mb-6">
          Total users: <span className="text-black">{users.length}</span>
        </p>

        {/* Table */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="w-full text-left divide-y divide-gray-200">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">NAME</th>
                <th className="p-4">EMAIL</th>
                <th className="p-4">ROLE</th>
                <th className="p-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      { user.role === 'admin' ? 
                        <button className='px-2.5 py-2 bg-emerald-600 text-white rounded text-xl hover:bg-emerald-700'>
                            <FaUserShield />
                        </button>
                        :
                        <button 
                        onClick={() => handleMakeAdmin(user)}
                        className="px-2.5 py-2 bg-yellow-600 text-white rounded text-xl hover:bg-yellow-700">
                            <HiOutlineUser />
                        </button>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(user)}
                        className="p-2 bg-red-600 text-white text-xl rounded hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                    No users found.
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

export default AllUsers;
