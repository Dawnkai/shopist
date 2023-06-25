import { createBrowserRouter } from 'react-router-dom';

import ItemList from './ItemList/ItemList';
import ShopList from './ShopList/ShopList';
import UnitList from './UnitList/UnitList';

export default router = createBrowserRouter([
    {
        path: "/",
        element: <ItemList/>
    },
    {
        path: "/shops",
        element: <ShopList/>
    },
    {
        path: "/units",
        element: <UnitList/>
    }
]);
