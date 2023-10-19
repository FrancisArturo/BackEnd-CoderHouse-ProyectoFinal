
const addProductTitle = document.getElementById("title");
const addProductPrice = document.getElementById("price");
const addProductDescription = document.getElementById("description");
const addProductStock = document.getElementById("stock");
const addProductCategory = document.getElementById("category");
const addProductStatus = document.getElementById("status");
const addProductCode = document.getElementById("code");
const addProductThumbnail= document.getElementById("thumbnail");
const addBtn = document.getElementById("addProductBtn"); 


async function addProduct(product) {
    const res = await fetch("/api/v1/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

addBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let product = {
        title: addProductTitle.value,
        description: addProductDescription.value,
        code: addProductCode.value,
        price: addProductPrice.value,
        status: addProductStatus.value,
        stock: addProductStock.value,
        category: addProductCategory.value,
        thumbnail: addProductThumbnail.value,
    };
    const userFound = await fetch("/api/v1/session/current", {
        method: "GET",
    });
    const resUser = await userFound.json()
    const userRole = resUser.currentUser.role
    if (userRole == "premium") {
        product.owner = resUser.currentUser.email;
    }
    const data = await addProduct(product);
    if (data.message === "Product added successfully") {
        alert("Product added successfully");
    } else if (data.message === "Product already exists") {
        alert("Product already exists");
    } else {
        alert("Add product Error");
    }
    addProductTitle.value = "";
    addProductPrice.value = "";
    addProductDescription.value = "";
    addProductStock.value = "";
    addProductCategory.value = "";
    addProductStatus.value = "";
    addProductCode.value = "";
    addProductThumbnail.value = "";
});