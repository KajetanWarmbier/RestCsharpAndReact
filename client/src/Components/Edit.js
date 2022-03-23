import { HiPencil } from 'react-icons/hi';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Axios from 'axios';

const Edit = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [product, setProduct] = useState(props.productInfo.name);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const putProduct = () => {
    const data = {
      id: props.productInfo.id,
      inStock: inStock,
      name: product,
    };

    Axios.put(
      `https://localhost:44302/api/products/${props.productInfo.id}`,
      data
    )
      .then((response) => {
        props.putProduct(data);
      })
      .catch((error) => {
        alert(error);
      });

    setIsOpen(false);
  };

  return (
    <>
      <HiPencil
        className='text-2xl hover:text-green-600 cursor-pointer'
        onClick={openModal}
      />
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
                  Edit Product
                </Dialog.Title>

                {/* checkboxe -> add default */}

                <div className='mt-4'>
                  <label className='block'>
                    <span className='text-gray-700'>In stock:</span>
                    <div className='mt-2'>
                      <label className='inline-flex items-center'>
                        <input
                          type='radio'
                          name='inStock'
                          value='No'
                          onChange={(e) => {
                            setInStock(false);
                          }}
                        ></input>
                        <span className='ml-2'>No</span>
                      </label>
                      <label className='inline-flex items-center ml-2'>
                        <input
                          type='radio'
                          name='inStock'
                          value='Yes'
                          onChange={(e) => {
                            setInStock(true);
                          }}
                        ></input>
                        <span className='ml-2'>Yes</span>
                      </label>
                    </div>
                  </label>
                </div>

                <label className='block'>
                  <span className='text-gray-700'>Product:</span>
                  <input
                    type='text'
                    name='product'
                    className='mt-1 block w-full p-1 border-2 border-gray-500 rounded-md'
                    value={product}
                    onChange={(event) => {
                      setProduct(event.target.value);
                    }}
                  ></input>
                </label>

                <div className='mt-4 float-right'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-2 py-1 text-md text-blue-600 font-medium bg-blue-200 border border-transparent rounded-full hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={putProduct}
                  >
                    Update
                  </button>
                  <button
                    type='button'
                    className='ml-2 inline-flex justify-center px-2 py-1 text-md text-red-600 font-medium bg-red-200 border border-transparent rounded-full hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>{' '}
    </>
  );
};

export default Edit;
