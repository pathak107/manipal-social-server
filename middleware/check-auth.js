//jwt for token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token=req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.userData = decoded;
        next()
    }
    catch (error) {
        return res.status(401).json({
            status: "failure",
            message: "Auth Failed",
            error: error,
        })

    }
}