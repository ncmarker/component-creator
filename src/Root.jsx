import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Root() {
    return (
        <div className="gradient-background overflow-hidden">
            <Navigation isSignedIn={true}/>
            <Outlet />
            <ToastContainer/>
        </div>
    );
}