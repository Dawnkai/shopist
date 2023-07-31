import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '../main/store';

import ExportPage from '../frontend/components/ExportPage/ExportPage';
import Navigation from '../frontend/components/Navigation/Navigation';
import ItemList from '../frontend/components/ItemList/ItemList';
import ProductList from '../frontend/components/ProductList/ProductList';
import ShopList from '../frontend/components/ShopList/ShopList';
import UnitList from '../frontend/components/UnitList/UnitList';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/shops" element={<ShopList />} />
          <Route path="/units" element={<UnitList />} />
        </Routes>
      </Router>
    </Provider>
  );
}
