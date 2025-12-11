import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full bg-white  px-6 py-4 flex justify-between items-center border border-b-border-1 shadow-sm sticky top-0 z-50">
            <Link to="/" className="text-xl text-text1 font-bold">MyLogo</Link>

            <Link to="/list" className="bg-bg2 px-4 py-2 rounded-lg hover:bg-bg1 transition">
                 List
            </Link>

        </nav>
    );
}