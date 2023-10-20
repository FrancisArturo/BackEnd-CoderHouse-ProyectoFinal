

const userDelete = async (uid) => {
    const deleteUser = await fetch(`/api/v1/session/users/${uid}`, {
        method: "DELETE",
    });
    const res = await deleteUser.json();
    if (res.message == "User delete successfully") {
        return window.location.replace("/users");
    }
}