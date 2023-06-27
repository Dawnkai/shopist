import Nav from 'react-bootstrap/Nav';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import ExportPage from '../frontend/ExportPage/ExportPage';
import Navigation from '../frontend/Navigation/Navigation';
import UnitList from '../frontend/UnitList/UnitList';

export default function App() {

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<UnitList/>}/>
        <Route path="/export" element={<ExportPage/>}/>
      </Routes>
    </Router>
  );
}
