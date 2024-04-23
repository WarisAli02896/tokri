const ShopKeeper = require("../../../data/models/shopKeeper/auth/shopKeeper");
const { delete_profile } = require("../../../data/objects/shopKeeper/auth/shopKeeper");
const { filter_merge_object } = require("../../../middleware/common");

exports.delete_shopkeeper = async (req, res) => {
    const reqData = req.body;
  
    try {
      // Find the user in the database
      await ShopKeeper.findOne({
        where: {
            shopKeeper_id: reqData.User.shopKeeper_id,
        },
      })
      .then(async (data) => {
        let delete_shopkeeper = filter_merge_object(reqData, delete_profile);
        if (delete_shopkeeper != null || delete_shopkeeper != undefined) {
          // Update the shopkeepers's deleted field to true
          await ShopKeeper.update(
            {
              is_deleted: true,
            },
            {
              where: {
                shopKeeper_id: reqData.User.shopKeeper_id,
              },
            }
          )
          .then(async (delete__shopkeeper) => {
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
                errorMessage: "Unable to Delete, please try again ",
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
  