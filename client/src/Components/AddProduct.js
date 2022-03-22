import { HiOutlinePlusCircle } from "react-icons/hi";

const AddProduct = () => {
  return (
    <div className="w-fit">
      <div className="flex mb-5 border-2 border-green-300 rounded-md p-2">
        <h1 className="font-medium text-xl text-green-700">Add Product</h1>
        <HiOutlinePlusCircle className="text-green-700 text-3xl ml-1" />
      </div>
    </div>
  );
};

export default AddProduct;
