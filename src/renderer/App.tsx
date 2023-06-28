import Nav from 'react-bootstrap/Nav';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import ExportPage from '../frontend/ExportPage/ExportPage';
import Navigation from '../frontend/Navigation/Navigation';
import ItemList from '../frontend/ItemList/ItemList';
import ProductList from '../frontend/ProductList/ProductList';
import ShopList from '../frontend/ShopList/ShopList';
import UnitList from '../frontend/UnitList/UnitList';

export default function App() {

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<ItemList/>}/>
        <Route path="/export" element={<ExportPage/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/shops" element={<ShopList/>}/>
        <Route path="/units" element={<UnitList/>}/>
      </Routes>
    </Router>
  );
}
