import { useEffect, useState } from 'react';
import Axios from 'axios';
import Product from './Product';
import AddProduct from './AddProduct';

const ProductsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    Axios.get('https://localhost:44302/api/products/')
      .then((response) => {
        setProductsList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Couldn't connect to server. \n ${error}`);
      });
  }, []);

  const addProductToList = (data) => {
    const newList = productsList.concat(data);
    setProductsList(newList);
  };

  const deleteProductFromList = (id) => {
    const newList = productsList.filter((product) => product.id !== id);
    setProductsList(newList);
  };

  const changeProductInList = (data) => {
    const index = productsList.findIndex((prod) => prod.id === data.id);
    const products = [...productsList];
    products[index] = data;

    setProductsList(products);
  };

  if (isLoading) {
    return <div className='flex items-center justify-center'>Loading...</div>;
  }

  return (
    <div className='min-h-full h-fit'>
      <button className='cursor-pointer w-fit'>
        <AddProduct updateProduct={addProductToList} />
      </button>
      <div className='overflow-auto '>
        <div className='min-w-max'>
          <div className='min-w-max grid grid-cols-6 content-evenly justify-evenly justify-items-center h-[3rem] bg-gray-400 rounded-t-md text-gray-900 font-semibold'>
            <div>ID</div>
            <div>inStock</div>
            <div>Name</div>
            <div>Info</div>
            <div>Edit</div>
            <div>Delete</div>
          </div>
          <div>
            {productsList.map((prod) => {
              return (
                <Product
                  prodData={prod}
                  deleteProduct={deleteProductFromList}
                  putProduct={changeProductInList}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
