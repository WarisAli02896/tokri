const { StatusCodes } = require("http-status-codes");

exports.validate_User_for_Shop = (req, res, next) => {
    const reqData = req.body;
    const path = req.path;
    switch (path) {
        case '/shop/register':
            if (req.body.User.type == "Shop Keeper" || req.body.User.type == "Admin" || req.body.User.type == "Inspection") {
                next();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    data: {
                        errorMessage: "Unuthorized"
                    }
                })
            }
            break;
        case '/user/shops':
            if (req.body.User.type != "Customer") {
                next();
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    data: {
                        errorMessage: "Unuthorized"
                    }
                })
            }
            break;
        case '/user/shops/shop':
            next();
            break;
        case '/shops/verify':
            next();
            break;
        default:
            return res.status(StatusCodes.UNAUTHORIZED).json({
                data: {
                    errorMessage: "Unuthorized"
                }
            })
    }
}