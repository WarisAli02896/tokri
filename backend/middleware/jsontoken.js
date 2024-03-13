const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

exports.jwtToken = (value) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user_id: value.user_id,
            name: `${value.firstname} ${value.lastname}`,
            email: value.email,
            type: value.type,
            verified: value.verified
        };

        const secret = process.env.SESSION_SECRET;

        let options = {
            expiresIn: '1y',
            issuer: process.env.BASE_URL,
            audience: `${value.user_id}`
        }

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) {
                reject(error);
            } else if (token) {
                resolve(token);
            }
        })
    });
}

exports.verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            error: {
                status: StatusCodes.UNAUTHORIZED,
                errorMessage: "Authorization token missing"
            }
        });
    } else if (req.headers['authorization']) {
        let token = req.headers['authorization'].split(" ");
        // token = token.split(" ");
        // const token = baererToken[1];
        jwt.verify(token[1], process.env.SESSION_SECRET, (err, result) => {
            if (err) {
                return res.status(err.status || StatusCodes.UNAUTHORIZED).json({
                    error: {
                        err,
                        status: err.status || StatusCodes.UNAUTHORIZED,
                        errorMessage: "User not authorized"
                    }
                });
            } else if (result) {
                const _token = jwt.verify(token[1], process.env.SESSION_SECRET);
                req.body.User = _token;
                next();
            }
        });
    }
}