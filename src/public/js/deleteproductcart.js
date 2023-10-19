


const deleteProductCart = async (pid) => {
    const userFound = await fetch("/api/v1/session/user", {
        method: "GET",
    });
    const userData = await userFound.json();
    
    const cid = userData.carts;
    const res = await fetch(`/api/v1/carts/${cid}/products/${pid}`, {
        method: "DELETE",
    });
    const data = await res.json();
    if (data.message == "Product deleted successfully") {
        alert("Product deleted successfully");
    } else if (data.message == "Cart not found") {
        alert("Cart not found");
    } else if (data.message == "Product not found") {
        alert("Product not found");
    } else {
        alert("Delete product from cart error");
    };
    window.location.reload();
}

