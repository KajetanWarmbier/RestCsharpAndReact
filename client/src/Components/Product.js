import { HiTrash, HiInformationCircle, HiXCircle } from "react-icons/hi";
import { useState, useEffect } from "react";

const Product = (props) => {
  const [isInStock, setIsInStock] = useState("");

  useEffect(() => {
    if (props.prodData.inStock === true) {
      setIsInStock("Yes");
    } else {
      setIsInStock("No");
    }
  }, []);

  return (
    <div>
      <div className="min-w-max grid grid-cols-5 content-evenly justify-evenly justify-items-center h-[3rem] bg-gray-200 text-gray-700 font-normal">
        <div>{props.prodData.id}</div>
        <div>{isInStock}</div>
        <div>{props.prodData.name}</div>
        <div className="flex justify-center items-center">
          <HiInformationCircle
            // onClick={openModal}
            className="text-2xl hover:text-blue-600 cursor-pointer"
          />
        </div>
        <div className="flex justify-center items-center">
          <HiTrash className="text-2xl hover:text-red-600 cursor-pointer" />
        </div>
      </div>
      <hr className="border-1 border-gray-300"></hr>
    </div>
  );
};

export default Product;
