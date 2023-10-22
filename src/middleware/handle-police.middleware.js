import { getLogger } from "../utils/logger.js";
import passport from "passport";

const logger = getLogger();

function handlePolicies(policies) {
    return (req, res, next) => {
        if (policies.length === 1 && policies[0] === "public") {
            return next();
        }
        passport.authenticate("jwt", {session: false}, (err, userJWT, info) => {
            if (err) {
                return next(err);
            }
            if (!userJWT && policies.includes("pswRecover")) {
                return next();
            }
            if (!userJWT && policies.includes("public")) {
                return next();
            }
            if (!userJWT) {
                logger.error("Expired or invalid token");
                return res.status(401).send({message: "denied access, invalid token"});
            }
            if (policies.includes(userJWT.user.role)) {
                req.user = userJWT;
                return next();
            } else {
                logger.error("Unauthorized access for your role");
                return res.status(403).send({message: "Unauthorized access"});
            }

        })(req, res, next);
    };
}

export default handlePolicies