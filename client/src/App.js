import Navbar from './Components/Navbar';
import ProductsList from './Components/ProductsList';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='min-w-full p-5'>
        <ProductsList />
      </div>
    </div>
  );
}

export default App;
