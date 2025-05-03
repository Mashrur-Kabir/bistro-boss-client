import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { GiFruitBowl } from 'react-icons/gi';

const AddItem = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.image[0]) {
      Swal.fire('Missing Image', 'Please upload an image.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('details', data.details);
    formData.append('image', data.image[0]);

    try {
      const res = await axiosSecure.post('/menu', formData);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Item added successfully!', 'success');
        reset();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to add item.', error);
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-100 font-quicksand container mx-auto overflow-auto">
      <SectionTitle heading="ADD AN ITEM" subheading="What's new?" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto space-y-6"
      >
        {/* Recipe Name */}
        <div>
          <label className="block font-semibold mb-1">Recipe name*</label>
          <input
            type="text"
            placeholder="Recipe name"
            {...register('name', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Category*</label>
            <select
              {...register('category', { required: true })}
              defaultValue=""
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-400"
            >
              <option value="" disabled hidden>
                Choose Category
              </option>
              <option value="salad" className="text-black">Salad</option>
              <option value="pizza" className="text-black">Pizza</option>
              <option value="soups" className="text-black">Soups</option>
              <option value="dessert" className="text-black">Dessert</option>
              <option value="drinks" className="text-black">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price*</label>
            <input
              type="number"
              placeholder="Price"
              {...register('price', { required: true })}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div>
          <label className="block font-semibold mb-1">Recipe Details</label>
          <textarea
            placeholder="Recipe Details"
            rows="5"
            {...register('details', { required: true })}
            className="w-full border border-gray-300 px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: true })}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-gray-300 file:rounded file:bg-gray-150 hover:file:bg-slate-200"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-semibold text-white transition-all duration-300 ease-in-out transform rounded shadow-lg bg-gradient-to-r from-orange-700 to-yellow-600 hover:scale-105 hover:shadow-2xl group"
          >
            <span className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out bg-gradient-to-r from-yellow-600 to-orange-700 opacity-0 group-hover:opacity-100 blur-sm"></span>
            <span className="relative z-10 flex items-center gap-2">
              Add Item <GiFruitBowl />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
