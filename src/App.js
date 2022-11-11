import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { AddProducts } from './components/AddProducts'
import ProductsFire from "./components/ProductsFire";
import CreateProductsFire from "./components/CreateProductsFire";
import UpdateProductsFire from "./components/UpdateProductsFire";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/productsfire" element={<ProductsFire />} />
        <Route path="/createproductsfire" element={<CreateProductsFire />} />
        <Route path="/updateproductsfire" element={<UpdateProductsFire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
