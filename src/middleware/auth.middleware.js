export const authMdw = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/views/login");
    }
};