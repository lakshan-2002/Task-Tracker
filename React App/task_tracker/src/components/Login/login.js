import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css";
// import backgroundImage from "../../assets/images/nature.jpg"; // Ensure the path is correct

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        console.log("🔍 Login.js Mounted - User:", user); // ✅ Debugging line

        if (user) {
            console.log("🚀 Redirecting to Dashboard...");
            navigate("/dashboard", { replace: true });
        }
    }, [navigate]);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            setErrorMessage("⚠️ Email and password are required!");
            return;
        }

        if (!validateEmail(loginData.email)) {
            setErrorMessage("⚠️ Please enter a valid email address!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "❌ Invalid email or password");
            }

            localStorage.setItem("user", JSON.stringify(data));
            console.log("User logged in:", data);
            
            alert("✅ Login successful!");
            navigate("/dashboard", {replace: true});
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <h2>Login</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Username</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email or Username"
                                onChange={handleChange}
                                value={loginData.email}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={loginData.password}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="options">
                            <label>
                                <input type="checkbox" id="RememberMe" /> Remember Me
                            </label>
                            <Link to="#" className="forgot-password" onClick={() => alert("Forgot Password Clicked!")}>
                                Forgot Password?
                            </Link>
                        </div>
                        <button type="submit">LOGIN</button>
                        <p className="register-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default Login;
