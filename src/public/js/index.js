

const addCartProduct = async (pid) => {
    const userFound = await fetch("/api/v1/session/user", {
        method: "GET",
    });
    const userData = await userFound.json();
    const productId = pid
    const productFound = await fetch(`/api/v1/products/${productId}`, {
        method: "GET",
    });
    const resProduct = await productFound.json()
    const productOwner = resProduct.data.owner;
    if (userData.email != productOwner) {
        const cartId = userData.carts;
        const quantityProductSelect = document.getElementById(pid).value;
            
        const quantityProduct = {
            quantity: quantityProductSelect
        }
        const res = await fetch(`/api/v1/carts/${cartId}/products/${pid}`, {
            method: "POST",
            body: JSON.stringify(quantityProduct),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.message == "Product added successfully") {
            return alert("Producto agregado al carrito n° " + cartId);
        }
    } else {
        return alert("Unauthorized to add this product");
    }

}









