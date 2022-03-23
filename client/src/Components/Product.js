import { HiTrash, HiInformationCircle, HiXCircle } from 'react-icons/hi';
import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Axios from 'axios';
import Edit from './Edit';

const Product = (props) => {
  // const [isInStock, setIsInStock] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  // useEffect(() => {
  //   if (props.prodData.inStock === true) {
  //     setIsInStock('Yes');
  //   } else {
  //     setIsInStock('No');
  //   }
  // }, []);

  const openModal = () => {
    setIsOpen(true);

    Axios.get(`https://localhost:44302/api/products/${props.prodData.id}`)
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteProduct = () => {
    Axios.delete(`https://localhost:44302/api/products/${props.prodData.id}`)
      .then((response) => {
        props.deleteProduct(props.prodData.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className='min-w-max grid grid-cols-6 content-evenly justify-evenly justify-items-center h-[3rem] bg-gray-200 text-gray-700 font-normal'>
        <div>{props.prodData.id}</div>
        <div>{props.prodData.inStock === true ? 'Yes' : 'No'}</div>
        <div>{props.prodData.name}</div>
        <div className='flex justify-center items-center'>
          <HiInformationCircle
            onClick={openModal}
            className='text-2xl hover:text-blue-600 cursor-pointer'
          />
        </div>
        <div className='flex justify-center items-center'>
          <Edit productInfo={props.prodData} putProduct={props.putProduct} />
        </div>
        <div className='flex justify-center items-center'>
          <HiTrash
            onClick={deleteProduct}
            className='text-2xl hover:text-red-600 cursor-pointer'
          />
        </div>
      </div>
      <hr className='border-1 border-gray-300'></hr>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900 text-center'
                >
                  Product Informations
                </Dialog.Title>
                <div className='mt-2'>
                  <div className='grid grid-rows-3'>
                    <div>
                      <p>ID: {productInfo.id}</p>
                    </div>
                    <div>
                      <p>
                        In stock: {productInfo.inStock === true ? 'Yes' : 'No'}
                      </p>
                    </div>
                    <div>
                      <p>Name: {productInfo.name}</p>
                    </div>
                  </div>
                </div>

                <div className='mt-4 float-right'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-1 py-1 text-xl font-medium bg-red-200 border border-transparent rounded-full hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    <HiXCircle className='text-2xl text-red-600' />
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Product;
