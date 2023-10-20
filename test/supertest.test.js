import supertest from "supertest";
import { expect } from "chai";
import { beforeEach } from "mocha";


const BASE_API_URL = "http://localhost:5000"
const PRODUCTS_ROUTE = "/api/v1/products";
const CARTS_ROUTE = "/api/v1/carts";
const SESSION_ROUTE = "/api/v1/session";


describe("functional test for all endpoints", () => {
    let requester;
    let cookie;
    let products;
    let productIdMock;
    let productCartIdMock;
    let cartIdMock;
    let userIdMock;
    describe("Products endpoints", () =>{
        beforeEach(() =>{
            requester = supertest(`${BASE_API_URL}`);
        });

        it("should GET /api/v1/products return a product list successfully with code 200", async () => {
            const { statusCode, ok, _body } = await requester.get(`${PRODUCTS_ROUTE}`);
            products = _body.data;
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(_body.message).to.eq("Products retrieved successfully");
            expect(Array.isArray(_body.data)).to.be.true;
            expect(_body.data).to.have.length.above(0);
        });
        it("should POST /api/v1/products create a product successfully with code 200", async () => {
            const bodyProduct = {
                title: "Torta de chocolate",
                description: "Torta de chocolate",
                code: "TCH-ARG-445",
                price: 1200,
                status: true,
                stock: 200,
                category: "panificados",
                thumbnail: ""
            };
            const { statusCode, ok, _body } = await requester.post(`${PRODUCTS_ROUTE}`).send(bodyProduct);
            productIdMock = _body.data._id;
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(_body.message).to.eq("Product added successfully");
            expect(_body.data).to.have.property("_id");
        });
        it("should DELETE /api/v1/products/:pid delete a product successfully with code 200", async () => {
            const { ok, statusCode, _body  } = await requester.delete(`${PRODUCTS_ROUTE}/${productIdMock}`);
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(_body.message).to.eq("Product deleted successfully");
        });
    });
    describe("Session endpoints", () => {
        beforeEach(() =>{
            requester = supertest(`${BASE_API_URL}`);
        });
        it("should POST /api/v1/session/register register a user successfully with code 200", async () => {
            const newUserBody = {
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@gmail.com",
                age: 22,
                password: "asdf"
            };
            const { statusCode, ok, _body } = await requester.post(`${SESSION_ROUTE}/register`).send(newUserBody);
            userIdMock = _body.newUserUpdated._id;
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(_body.message).to.eq("Successfully registered user");
        });
        it("should POST /api/v1/session/login login a user successfully", async () => {
            const loginBody = {
                email: "jdoe@gmail.com",
                password: "asdf"
            };
            const result = await requester.post(`${SESSION_ROUTE}/login`).send(loginBody);
            const cookieResult = result.headers["set-cookie"][0]
            expect(cookieResult).to.be.ok;
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            }
            expect(cookie.name).to.be.ok.and.eql("cookieToken");
            expect(cookie.value).to.be.ok;
        });
        it("should get /api/v1/session/current return a user currently logged successfully", async () => {
            const { _body } = await requester.get(`${SESSION_ROUTE}/current`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
            expect(_body.currentUser.email).to.be.eql("jdoe@gmail.com");
        });
    });
    describe("Carts endpoints", () => {
        beforeEach(() =>{
            requester = supertest(`${BASE_API_URL}`);
        });
        after( async () => {
            await requester.delete(`${CARTS_ROUTE}/${cartIdMock}`);
            await requester.delete(`${SESSION_ROUTE}/users/${userIdMock}`);
        })
        it("should POST /api/v1/carts/:cid/products/:pid add a product to user cart successfully with code 200", async () => {
            const { _body } = await requester.get(`${SESSION_ROUTE}/user`).set("Cookie", [`${cookie.name}=${cookie.value}`]);
            cartIdMock = _body.carts
            productCartIdMock = products[0]._id;
            const addProductBody = {
                quantity: 1
            }
            const { statusCode, ok, _body: cartBody } = await requester.post(`${CARTS_ROUTE}/${cartIdMock}/products/${productCartIdMock}`).send(addProductBody);
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(cartBody.message).to.eq("Product added successfully");
            expect(Array.isArray(cartBody.data)).to.be.true;
            expect(cartBody.data).to.have.length.above(0);
            expect(cartBody.data[0].product._id).to.be.eql(productCartIdMock);
        });
        it("should PUT /api/v1/carts/:cid/products/:pid update the number of products to add to the cart successfully with code 200", async () => {
            const addProductBody = {
                quantity: 20
            }
            const { statusCode, ok, _body: cartBody } = await requester.put(`${CARTS_ROUTE}/${cartIdMock}/products/${productCartIdMock}`).send(addProductBody);
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(cartBody.message).to.eq("Product quantity updated successfully");
            expect(cartBody.data.products[0].quantity).to.eql(20);
        });
        it("should DELETE /api/v1/carts/:cid/products/:pid delete a product to the cart successfully with code 200", async () => {
            const { statusCode, ok, _body: cartBody } = await requester.delete(`${CARTS_ROUTE}/${cartIdMock}/products/${productCartIdMock}`);
            expect(statusCode).to.eq(200);
            expect(ok).to.be.ok;
            expect(cartBody.message).to.eq("Product deleted successfully");
            expect(cartBody.data).to.be.an( "array" ).that.is.empty;
        });
    });
})