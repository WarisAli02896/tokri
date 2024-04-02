const {} = require("http-status-codes");
const User = require("../../../data/models/customer/users");

exports.update_user = async (req, res) => {
    const reqData = req.body;

    if(
        reqData.type != null ||
        reqData.user_id != null ||
        reqData.createdAt != null ||
        reqData.updatedAt != null
    ) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage: "Shop Keeper type or Id can not be changed",
            errorCode: "auth0011",
          },
        });
    } else if (reqData.is_deleted != null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage: "Account can not be deleted from here",
            errorCode: "auth0012",
          },
        });
    } else if (reqData.password != null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage: "Password can not be chnage from here",
            errorCode: "auth0013",
          },
        });
    } else if (reqData.verified != null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage:
              "Your account can not verify from here. Please check confirmation mail to verify your account",
            errorCode: "auth0014",
          },
        });
    }



}