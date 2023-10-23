

const userChangeRole = async (uid) => {
    const roleUpdate = await fetch(`/api/v1/session/users/${uid}/role`, {
        method: "PUT",
    });
    const res = await roleUpdate.json();
    if (res.message == "Role change successfully") {
        return window.location.replace("/users");
    }
}

