import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation({isSignedIn}) {
    // set default active link to the last bit of URL (mycomponents page by default)
    const [active, setActive] = useState(() => {
        const path = window.location.pathname;
        const lastSegment = path.substring(path.lastIndexOf('/') + 1) || 'mycomponents';
        return lastSegment;
    });

    // updates current active nav link when user clicks it
    const handleActiveUpdate = (backup) => {
        const path = window.location.pathname;
        const lastSegment = path.substring(path.lastIndexOf('/') + 1) || backup;
        setActive(lastSegment);
    }

    // useEffect to change active link when redirects change pages (not by user click)
    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        const lastSegment = path.substring(path.lastIndexOf('/') + 1) || 'mycomponents';
        setActive(lastSegment);
    }, [location]);
    
    // removes current user from session
    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
    };

    return (
        <nav className="flex flex-row p-6 space-between font-semibold">
            <img src="/imgs/logo.png" alt="logo" width="40px" className="mb-1"/>
            <div className="mx-auto flex flex-row gap-12 items-center text-white">
                {isSignedIn && 
                    <Link 
                        to="/mycomponents" 
                        className={`${active === 'mycomponents' ? 'underline' : '' } hover:underline`}
                        onClick={() => handleActiveUpdate('mycomponents')}
                    >My Components</Link>}
                {isSignedIn && 
                    <Link 
                        to="/createcomponent" 
                        className={`${active === 'createcomponent' ? 'underline' : '' } hover:underline`}
                        onClick={() => handleActiveUpdate('createcomponent')}
                    >Create Component</Link>}
                {isSignedIn && 
                    <Link 
                        to="/findinspiration" 
                        className={`${active === 'findinspiration' ? 'underline' : '' } hover:underline`}
                        onClick={() => handleActiveUpdate('findinspiration')}
                    >Find Inspiration</Link>}
                {isSignedIn && 
                    <Link 
                        to="/myinspiration" 
                        className={`${active === 'myinspiration' ? 'underline' : '' } hover:underline`}
                        onClick={() => handleActiveUpdate('myinspiration')}
                    >My Inspiration</Link>}
            </div>
            {isSignedIn && <Link to="/" className="text-white mt-1 hover:underline" onClick={handleLogout}>Logout</Link>}
        </nav>
    );
}