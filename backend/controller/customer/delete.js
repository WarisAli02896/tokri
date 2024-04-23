const Users = require("../../data/models/customer/auth/users");
const { delete_profile } = require("../../data/objects/customer/users");
const { filter_merge_object } = require("../../middleware/common");

exports.delete_user = async (req, res) => {
  const reqData = req.body;

  try {
    // Find the user in the database
    await Users.findOne({
      where: {
        user_id: reqData.User.user_id,
      },
    })
    .then(async (data) => {
      let deleteCustomer = filter_merge_object(reqData, delete_profile);
      if (deleteCustomer != null || deleteCustomer != undefined) {
        // Update the user's deleted field to true
        await Users.update(
          {
            is_deleted: true,
          },
          {
            where: {
              user_id: reqData.User.user_id,
            },
          }
        )
        .then(async (delete__customer) => {
          return res.status(StatusCodes.OK).json({
            data: {
              responseMessage: " Profile Deleted Successfully",
              responseCode: "auth00",
            },
          });
        })
        .catch(async (error) => {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {
              errorMessage: "unable to Delete, please try again ",
              errorCode: "auth0000",
              Error: {
                message: error.message,
                error,
              },
            },
          });
        });
      }
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      data: {
        errorMessage: "Unable to update, Please try again",
        errorCode: "auth000",
        logs: {
          message: error.message,
          error,
        },
      },
    });
  }
};
