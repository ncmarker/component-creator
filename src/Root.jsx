import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div className="gradient-background overflow-hidden">
            <Navigation isSignedIn={true}/>
            <Outlet />
        </div>
    );
}