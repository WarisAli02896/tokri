const { StatusCodes } = require("http-status-codes");
const Users = require("../../../data/models/customer/auth/users");
const { decrypt, encrypt } = require("../../../middleware/urlEncryption");
const {
  update_email_verification_body,
} = require("../../../data/objects/mail/mailBody");
const { update_email } = require("../../../data/objects/urls/encryptPath");
const Mail = require("nodemailer/lib/mailer");
const { _sendMail } = require("../../../utils/send_email");
const Update = require("../../../data/models/sync/update");

//code to update the email
exports.update_email = async (req, res) => {
  const reqData = req.query;
  let decryptData = null;

  await Update.findByPk(reqData.set)
    .then(async (data) => {
      decryptData = decrypt(data.dataValues.data);
    })
    .catch(async (error) => {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {
          errorMessage:
            "Email update failed, try again or request to update email again from profile",
          errorCode: "auth0000",
        },
      });
    });
  await Users.findOne({
    where: {
      user_id: decryptData.id,
      email: decryptData.email,
    },
    attributes: {
      exclude: ["passward"],
    },
  })
    .then(async (Users) => {
      if (Users == null) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          data: {
            errorMessage: "You are unauthorized",
            errorCode: "auth0021",
          },
        });
      } else if (Users != null) {
        await Users.update(
          {
            email: decryptData.new_email,
          },
          {
            where: {
              user_id: decryptData.id,
            },
          }
        )
          .then(async (user_customer) => {
            return res.status(StatusCodes.OK).json({
              data: {
                responseMessage: " Email successfully updated",
                responseCode: "auth0022",
              },
            });
          })
          .catch(async (error) => {
            return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
              data: {
                errorMessage: "Email update failed please try again",
                errorCode: "auth0023",
                Error: {
                  message: error.message,
                  error,
                },
              },
            });
          });
      }
    })
    .catch(async (error) => {
      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        data: {
          errorMessage: "Email update failed please try again",
          errorCode: "auth0023",
          Error: {
            message: error.message,
            error,
          },
        },
      });
    });
};

exports.verify_update_email = async(req,res)=>{
  const reqData= req.body;

  if(reqData.new_email != null){
     //Encrypt user_id, old_email, new_email for creating querry params
     const path =encrypt(update_email);
     update_email.id = reqData.User.user_id;
     update_email.email = reqData.User.email;
     update_email.new_email = reqData.new_email;

    await Update.create({
      data: path,
    })
    .then(async (data) =>{
      try {
        //seting mail body
        update_email_verification_body.to = reqData.User.email;
        //seting it according to new API
        update_email_verification_body.text += `/n${process.env.BASE_URL}/customer/update/email?set=${data.dataValues.id}`;
        await _sendMail(update_email_verification_body);

        await Mail.create({
          from: update_email_verification_body.from,
          to: update_email_verification_body.to,
          subject: update_email_verification_body.subject,
          text: update_email_verification_body.text,
          reason: `Verify new email address updated on User/n user_id:${reqData.User.user_id}`,
          type: "New email verification",
          status:true,
        })
      }
  })
  
}

 };

