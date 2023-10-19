const passwordRecover = document.getElementById("PasswordRecover");
const passwordrepeatRecover = document.getElementById("passwordRecoverRepeat");
const recoverBtn = document.getElementById("btnRecoverPsw");


async function recoverCompletePassword(psw) {
    const res = await fetch(`/api/v1/session/recover/complete`, {
        method: "POST",
        body: JSON.stringify(psw),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

recoverBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    if (passwordRecover.value != passwordrepeatRecover.value) {
        return alert ("Passwords do not match")
    }
    const psw = {
        password: passwordRecover.value
    };
    const data = await recoverCompletePassword(psw);
    if (data.message == "the password must be different from the previous one") {
        return alert("the password must be different from the previous one");
    } else {
        alert("Password update successfully")
        return window.location.replace("/login");
    }
});