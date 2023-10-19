
const deleteProduct = async (pid) => {
    const userFound = await fetch("/api/v1/session/current", {
        method: "GET",
    });
    const resUser = await userFound.json();
    const userRole = resUser.currentUser.role;
    const userEmail = resUser.currentUser.email;
    const productId = pid;
    const productFound = await fetch(`/api/v1/products/${productId}`, {
        method: "GET",
    });
    const resProduct = await productFound.json();
    const productOwner = resProduct.data.owner;
    if (userEmail == productOwner || userRole == "admin") {
        const productDelete = await fetch(`/api/v1/products/${pid}`, {
        method: "DELETE",
        });
        const data = await productDelete.json();
        if (data.message == "No product found") {
            alert("No product found"); 
        } else {
            alert("Product deleted successfully");
        };
        window.location.replace("/home");
    } else {
        return alert ("Unauthorized to delete this product");
    }
}