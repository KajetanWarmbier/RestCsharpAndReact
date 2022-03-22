import Navbar from "./Components/Navbar";
import ProductsList from "./Components/ProductsList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="flex min-w-max h-[100vh] m-5">
        <ProductsList />
      </div>
    </div>
  );
}

export default App;
