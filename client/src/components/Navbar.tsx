import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full bg-bg2 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="text-xl font-bold">MyLogo</div>

            <Link to="/list" className="bg-bg3 px-4 py-2 rounded-lg hover:bg-bg1 transition">
                 List
            </Link>

        </nav>
    );
}