import { useEffect, useState } from "react";
import Axios from "axios";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { Dialog } from "@headlessui/react";

const ProductsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    Axios.get("https://localhost:44302/api/products/")
      .then((response) => {
        setProductsList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      <Dialog
        as="div"
        open={isOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto "
      >
        <Dialog.Overlay />
        <Dialog.Title>Add Product</Dialog.Title>
        <Dialog.Description>Another random text</Dialog.Description>
        <p>Random words in modal</p>
        <button onClick={closeModal}>close</button>
      </Dialog>
      <div className="min-w-full h-fit xl:min-w-0 xl:w-[1250px]">
        <button onClick={openModal}>yo</button>
        <div className="cursor-pointer w-fit">
          <AddProduct onClick={openModal} />
        </div>
        <div className="min-w-max grid grid-cols-5 content-evenly justify-evenly justify-items-center h-[3rem] bg-gray-400 rounded-t-md text-gray-900 font-semibold">
          <div>ID</div>
          <div>inStock</div>
          <div>Name</div>
          <div>Info</div>
          <div>Delete</div>
        </div>
        <div>
          {productsList.map((prod) => {
            return <Product prodData={prod} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
