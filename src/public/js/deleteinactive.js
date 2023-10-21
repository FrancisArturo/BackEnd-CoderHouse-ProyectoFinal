const deleteUsersBtn = document.getElementById("deleteInactiveBtn");

deleteUsersBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const deleteUsers = await fetch("/api/v1/session/users", {
        method: "DELETE",
    });
    const res = await deleteUsers.json();
    if (res.message == "Inactive users deleted") {
        alert("Inactive users deleted");
        return window.location.replace("/users");
    } else if (res.message == "No inactive users") {
        return alert("No inactive users");
    } else {
        return alert("Delete inactive user error");
    }
})