import { createBrowserRouter } from 'react-router-dom';

import ItemList from './ItemList/ItemList';

export default router = createBrowserRouter([
    {
        path: "/",
        element: <ItemList/>
    }
]);
