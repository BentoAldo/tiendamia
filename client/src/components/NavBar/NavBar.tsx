import { FC } from "react";
import { Link } from "react-router-dom";

const NavBar: FC = () => {
    return (
        <nav className="p-4 primary-color text-white">
            <Link to="/" className="text-2xl">Ecommerce Dashboard</Link>
        </nav>
    );
};

export default NavBar;
