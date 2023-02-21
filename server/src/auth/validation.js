const { verify } = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if(token) {
        token = token.slice(7);
        verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(err)
                res
                    .status(403)
                    .json({ status: "FAILED", message: "Failed to authenticate token." });
            else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        res 
            .status(401)
            .json({ status: "FAILED", message: "No JSON token provided." });
    }
};

const checkUserId = (req, res, next) => {
    let token = req.get("authorization");
    if(token) {
        token = token.slice(7);
        verify(token, process.env.JWT_KEY, (err, decoded) => {
            if(!err)
                req.userId = decoded.userId;
        });
    }
    next();
};

module.exports = { checkToken, checkUserId };