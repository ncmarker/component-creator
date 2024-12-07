import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Navigation from "../Navigation";

function LoginSignup() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [formData, setFormData] = useState({ username: "", password: "", first_name: "", last_name: "" });
    const navigate = useNavigate();

    // set page title
    useEffect(() => {
        document.title = "Login";
    }, []);

    // Hashing a password
    const hashPassword = (password) => {
        return CryptoJS.SHA256(password).toString();
    };

    // verify password
    const verifyPassword = (enteredPassword, hashedPassword) => {
        return hashPassword(enteredPassword) === hashedPassword;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // MAKE API REGUEST TO LOGIN OR SIGNUP
        try {
            const endpoint = "/users";
            const method = isLogin ? "GET" : "POST";

            if (isLogin) {
                // Login: Check if user exists ( GET /users wehere the username is the one entered )
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}?username=${formData.username}`);
                const response_json = await response.json();
                const user = response_json[0];

                if (verifyPassword(formData.password, user.password)) {
                    sessionStorage.setItem("currentUser", JSON.stringify(user.id));
                    navigate("/mycomponents");
                }
                else {
                    alert("Invalid username or password");
                };
            } else {
                formData.password = hashPassword(formData.password);

                // Signup: Add a new user ( POST /users )
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
                    method: method, 
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const newUser = await response.json();
                    sessionStorage.setItem("currentUser", JSON.stringify(newUser.id));
                    navigate("/mycomponents");
                } else {
                    alert("Failed to create account");
                }
            }
        } catch (err) {
            alert("Something went wrong: " + err.message);
        }
    };

    return (
    <div className="gradient-background">
    <Navigation isSignedIn={false}/>
    <div className="flex flex-col items-center justify-center mt-16">
        <h1 className="text-6xl font-bold text-white">Component Creator</h1>
        <p className="text-white mt-6">A simple React component creator for beginners learning to build a UI.</p>
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isLogin && (
            <>
                <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name || ""}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </>
            )}
            <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            {isLogin ? "Login" : "Sign Up"}
            </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold"
            >
            {isLogin ? "Sign Up" : "Login"}
            </button>
        </p>
        </div>
    </div>
    </div>
    );
};

export default LoginSignup;
