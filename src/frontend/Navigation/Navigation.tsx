import { useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import NavLinkProps from '../../types/NavLinkProps';

function LinkWithRouter({href, title}:NavLinkProps) {
    const navigate = useNavigate();

    return (
        <Nav.Link
            onClick={(e) => {
                e.preventDefault();
                navigate(href);
            }}
        >
            {title}
        </Nav.Link>
    );
}

export default function Navigation() {
    return (
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
            <LinkWithRouter
                href="/units"
                title="Units"
            />
        </Nav.Item>
        <Nav.Item>
            <LinkWithRouter
                href="/export"
                title="Export"
            />
        </Nav.Item>
        </Nav>
    )
}
