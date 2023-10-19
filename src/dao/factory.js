import { PERSISTENCE } from "../config/config.js";
import connectDB from "../db/mongo.config.js";



export let Products, Users, Carts, Tickets; 

switch (PERSISTENCE) {
    case "MONGO":
        connectDB();
        const {default: ProductsMongo} = await import("./mongo/products.mongo.js");
        const { default: UsersMongo } = await import("./mongo/users.mongo.js");
        const { default: CartsMongo } = await import("./mongo/carts.mongo.js");
        const { default: TicketsMongo } = await import("./mongo/tickets.mongo.js")
        Products = ProductsMongo;
        Users = UsersMongo;
        Carts = CartsMongo;
        Tickets= TicketsMongo;
        break;

    default:
        break;
}

