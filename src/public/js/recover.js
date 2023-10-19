const emailRecover = document.getElementById("EmailRecover");
const recoverBtn = document.getElementById("recoverSendButton");


async function recoverPassword(user) {
    const res = await fetch(`/api/v1/session/recover`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

recoverBtn.addEventListener("click", async(e) => {
    e.preventDefault();
    const user = {
        email: emailRecover.value
    };
    const data = await recoverPassword(user);
    if (data.message == "an email was sent") {
        alert("An email was sent, check it to continue with the process");
    } else {
        alert("User not found")
    }
})
