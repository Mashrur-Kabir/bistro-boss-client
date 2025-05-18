import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { GiFruitBowl } from 'react-icons/gi';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic(); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    // 1) Build **image-only** form data for Imgbb
    const imgData = {image: data.image[0]};
  
    // 2) Upload to Imgbb to get an url
    const imgRes = await axiosPublic.post(image_hosting_api, imgData, {
      headers: { 'Content-Type': 'multipart/form-data' } //it tells the server: “Hey, I'm sending more than just plain text. This includes files or blobs of data.”
    });
    
    if (!imgRes.data.success) {
      Swal.fire('Upload Error', 'Could not upload image.', 'error');
      return;
    }
    
    // getting the url from Imgbb and storing it:
    const imageUrl = imgRes.data.data.url;

    // 3) Build data for sending it to backend:
    const menuItem = {
      name: data.name,
      recipe: data.recipe,
      image: imageUrl,
      category: data.category,
      price: parseFloat(data.price)
    }

    console.log(menuItem)
    
    // 5) Send to your own backend
    try {
      const res = await axiosSecure.post('/menu', menuItem); //secure because its done by admin
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Item added successfully!', 'success');
        reset();
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to add item.', err);
    }

  };

  return (
    <div className="px-6 py-10 bg-gray-100 font-quicksand container mx-auto overflow-auto">
      <SectionTitle heading="ADD AN ITEM" subheading="Here you can" />

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
              <option value="soup" className="text-black">Soups</option>
              <option value="dessert" className="text-black">Dessert</option>
              <option value="drinks" className="text-black">Drinks</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-1">Price*</label>
            <input
              type="number"
              step="0.01"
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
            {...register('recipe', { required: true })}
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
            className="relative inline-flex items-center justify-center px-6 py-2 font-semibold text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-orange-700 to-orange-500 rounded-xl shadow-[0_6px_0_#b45309] active:translate-y-[3px] active:shadow-[0_2px_0_#b45309] group"
          >
            <span className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 blur-md rounded-xl"></span>
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
