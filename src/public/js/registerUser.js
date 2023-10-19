
const userFirstName = document.getElementById("firstName")
const userLastName = document.getElementById("lastName");
const userEmail = document.getElementById("email");
const userPhone = document.getElementById("phone");
const userAge = document.getElementById("age");
const userPassword = document.getElementById("password");
const userRegisterBtn = document.getElementById("registerBtn");

async function clearValues() {
    userFirstName.value = "";
    userLastName.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userAge.value = "";
    userPassword.value = "";
}

async function registerUser(newUser) {
    const res = await fetch("/api/v1/session/register", {
        method: "POSt",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

userRegisterBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const newUser = {
        firstName: userFirstName.value,
        lastName: userLastName.value,
        email: userEmail.value,
        phone: userPhone.value,
        age: userAge.value,
        password: userPassword.value
    }
    const data = await registerUser(newUser);
    if (data.message == "User already exists") {
        alert("User already exists");
    } else if (data.message == "Successfully registered user"){
        clearValues();
        alert("Successfully registered user");
        return window.location.replace("/login");
    }
})
