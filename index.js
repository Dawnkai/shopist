import { createRoot } from 'react-dom/client';
import Nav from 'react-bootstrap/Nav';
import { RouterProvider } from 'react-router-dom';

import router from './frontend/routes';

import './styles.css';

const App = () => {
    return (
        <>
            <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link href="/">Items</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/products">Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/shops">Shops</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/units">Units</Nav.Link>
                </Nav.Item>
            </Nav>
            <RouterProvider router={router}/>
        </>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <App/>
)
