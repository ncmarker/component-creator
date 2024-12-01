import { Link } from "react-router-dom";

export default function Navigation({isSignedIn}) {

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
    };

    return (
        <nav className="flex flex-row p-6 space-between font-semibold">
            <img src="/imgs/logo.png" alt="logo" width="40px" className="mb-1"/>
            <div className="mx-auto flex flex-row gap-12 items-center text-white">
                {isSignedIn && <Link to="/mycomponents" className="hover:underline">My Components</Link>}
                {isSignedIn && <Link to="/createcomponent" className="hover:underline">Create Component</Link>}
                {isSignedIn && <Link to="/findinspiration" className="hover:underline">Find Inspiration</Link>}
                {isSignedIn && <Link to="/myinspiration" className="hover:underline">My Inspiration</Link>}
            </div>
            {isSignedIn && <Link to="/" className="text-white mt-1 hover:underline" onClick={handleLogout}>Logout</Link>}
        </nav>
    );
}