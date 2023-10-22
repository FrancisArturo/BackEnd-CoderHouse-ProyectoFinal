export const generateProductInfoError = (product) => {
    return `One or more properties were incomplete or not valid.
    list of required properties:
    *title : needs to be a string, received ${product.title}
    *description: needs to be a string, received ${product.description}
    *price: needs to be a number, received ${product.price}
    *thumbnail: needs to be a string, received ${product.thumbnail}
    *code: needs to be a number, received ${product.code}
    *stock: needs to be a number, received ${product.stock}
    `
}
export const generateGetProductInfoError = (product) => {
    return `Error getting product by ${product.kind}: "${product.stringValue}"`
}
export const getUserEmailInfoError = (email) => {
    return `Error getting user by Email: "${email}"`
}
export const getUserIdInfoError = (user) => {
    return `Error getting user by ID: "${user.stringValue}"`
}
export const GetProductsInfoError = () => {
    return `Error getting all products from DB`
}
export const GetUsersInfoError = () => {
    return `Error getting all user from DB`
}
export const productExistsInfoError = (product) => {
    return `the product title "${product.title}" already exists in DB`
}
export const getCartInfoError = (product) => {
    return `Error getting cart by ${product.kind}: "${product.stringValue}`
}
export const userExistsInfoError = (user) => {
    return `the user email "${user.email}" already exists in DB`
}
export const pswExistsInfoError = () => {
    return `the password entered already exists in DB`
}
export const uploadInfoError = () => {
    return `Error uploading in DB`
}
export const invalidTokenInfoError = () => {
    return `Expired or invalid token`
}
export const unauthorizedInfoError = () => {
    return `unauthorized access for your role`
}