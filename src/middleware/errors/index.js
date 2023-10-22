import EnumsErrors from "../../utils/error-enums.js";


export const ErrorHandler = (error, req, res, next) => {
    switch (error.cause) {
        case EnumsErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.ROUTING_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.DATABE_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.PRODUCT_MISSING_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.PRODUCT_EXIST_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.CART_MISSING_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.USER_EXIST_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.USER_MISSING_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.PSW_EXISTS_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.INVALID_TOKEN_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EnumsErrors.UNAUTHORIZED_ACCESS_ERROR:
            res.send({status: "error", error: error.name});
            break;
        default:
            res.send({status: "error", error: "Unhandled error"});
            break;
    }
}