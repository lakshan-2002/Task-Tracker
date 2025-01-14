import React, { useState } from "react";
import { Link } from "react-router-dom"; // To navigate between routes
import { useNavigate } from "react-router-dom"; // To navigate after signup
import "./login.css";

const Signup = () => {
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            setErrorMessage("⚠️ All fields are required!");
            return;
        }

        if (!validateEmail(signupData.email)) {
            setErrorMessage("⚠️ Please enter a valid email address!");
            return;
        }

        if (signupData.password.length < 6) {
            setErrorMessage("⚠️ Password must be at least 6 characters long!");
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            setErrorMessage("⚠️ Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/user/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "❌ Sign-up failed");
            }

            alert("✅ Sign up successful! Redirecting to login...");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
      <div className="login-page">
        <div className="login-container">
            <div className="login-box">
                <h2>Sign Up</h2>
                <form id="signupForm" onSubmit={handleSubmit}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            value={signupData.username}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={signupData.email}
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
                            value={signupData.password}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            value={signupData.confirmPassword}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button type="submit">SIGN UP</button>
                    <p className="register-link">
                        Already have an account? <Link to="/login">Login</Link>
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

export default Signup;
