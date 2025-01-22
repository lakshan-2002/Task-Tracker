import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚪 Logging out...");

    // ✅ Remove user data from local storage
    localStorage.removeItem("user");

    // ✅ Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
