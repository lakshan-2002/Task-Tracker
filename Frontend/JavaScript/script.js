const element1 = document.getElementById('loginForm');
if (element1) {
  element1.addEventListener('submit', login, false);
}
// or, to keep it clean
element1?.addEventListener('submit', login, false);

const element2 = document.getElementById('signupForm');
if (element2) {
  element2.addEventListener('submit', signUp, false);
}
// or, to keep it clean
element2?.addEventListener('submit', signUp, false);


async function login(event) {
    event.preventDefault();

    // var userEmail,
    // email = document.getElementById('email');
    // if (email != null) {
    //     userEmail = email.value.trim();
    // }
    // else {
    //     userEmail = null;
    // }

    // var userPassword,
    // password = document.getElementById('password');
    // if (password != null) {
    //     userPassword = password.value.trim();
    // }
    // else {
    //     userPassword = null;
    // }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert("⚠️ Email and password are required!");
        return;
    }

    if (!validateEmail(email)) {
        alert("⚠️ Please enter a valid email address!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) 
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "❌ Invalid email or password");
        }

        localStorage.setItem("user", JSON.stringify(data)); // Store user details
        alert('✅ Login successful!');
        window.location.href = "http://localhost:3000/dashboard"; // Redirect to dashboard
    } catch (error) {
        alert(error.message);
    }
}

async function signUp(event) {
    event.preventDefault();

    // var name,
    // userName = document.getElementById('userName');
    // if (userName != null) {
    //     name = userName.value.trim();
    // }
    // else {
    //     name = null;
    // }

    // var userEmail,
    // email = document.getElementById('email');
    // if (email != null) {
    //     userEmail = email.value.trim();
    // }
    // else {
    //     userEmail = null;
    // }

    // var userPassword,
    // password = document.getElementById('password');
    // if (password != null) {
    //     userPassword = password.value.trim();
    // }
    // else {
    //     userPassword = null;
    // }


    // var password,
    // confirmPassword = document.getElementById('confirmPassword');
    // if (confirmPassword != null) {
    //     password = confirmPassword.value.trim();
    // }
    // else {
    //     password = null;
    // }

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!username || !email || !password || !confirmPassword) {
        alert("⚠️ All fields are required!");
        return;
    }

    if (!validateEmail(email)) {
        alert("⚠️ Please enter a valid email address!");
        return;
    }

    if (password.length < 6) {
        alert("⚠️ Password must be at least 6 characters long!");
        return;
    }

    if (password !== confirmPassword) {
        alert("⚠️ Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/user/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "❌ Sign-up failed");
        }

        alert('✅ Sign up successful! Redirecting to login...');
        window.location.href = "login.html"; // Redirect after signup
    } catch (error) {
        alert(error.message);
    }
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
