const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { email_verification_body } = require('../../../../data/objects/mail/mailBody');
const { _sendMail } = require('../../../../utils/send_email');
const Users = require('../../../../data/models/customer/auth/users');
const MailSync = require('../../../../data/models/mailSync');
const { encrypt } = require('../../../../middleware/urlEncryption');
const { save_mails } = require('../../../../middleware/saveMails');
exports.register_User = async (req, res) => {
    const reqData = req.body;

    if (reqData.password == reqData.confirmPassword) {
        try {
            reqData.password = await bcrypt.hashSync(reqData.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));
        } catch (error) {

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                data: {
                    errorMessage: 'Unable to create account',
                    errorCode: 'auth0000',
                    Error: {
                        errorCode: error.status,
                        errorMessage: error.message,
                        error
                    }
                }
            })
        }

        // let user_id;

        let data = await Users.findOrCreate({
            where: {
                email: reqData.email
            },
            defaults: {
                firstname: reqData.firstname,
                lastname: reqData.lastname,
                email: reqData.email,
                password: reqData.password,
                phone: reqData.phone,
                profile_picture: reqData.profile_picture
            },
            attributes: { exclude: ['password'] }
        })
            .then(async ([data, isCreated]) => {
                if (isCreated == false) {
                    return res.status(StatusCodes.CONFLICT).json({
                        data: {
                            errorMessage: "Email is already registered!",
                            errorCode: "auth0003"
                        }
                    });
                } else if (isCreated == true) {
                    let id = await encrypt(data.user_id);
                    email_verification_body.to = data.email;
                    email_verification_body.text += `${process.env.BASE_URL}/user/verifyUser?id=${id}`;
                    email_verification_body.reason = `Account verification mail sent to Customer/n user_id:${data.dataValues.user_id}`;
                    email_verification_body.type = 'Customer Account Verification';
                    try {
                        email_verification_body.status = true;
                        await _sendMail(email_verification_body);

                        //saving status of mail
                        var mail = await save_mails(email_verification_body);
                        data.mail = mail;
                    } catch (error) {
                        email_verification_body.status = false;
                        data.mail = await save_mails(email_verification_body);
                    }

                    return res.status(StatusCodes.OK || StatusCodes.GATEWAY_TIMEOUT).json({
                        data: {
                            responseMessage: " Account created successfully. Please check email for Account Verification",
                            User: data.dataValues,
                            mail: data.mail,
                            responseCode: "auth0004"
                        }
                    });
                }
            })
            .catch((err) => {
                return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
                    data: {
                        errorMessage: "Account not created. Please try again",
                        errorCode: "auth0000"
                    }
                });
            });
    } else if (reqData.password != reqData.confirmPassword) {
        return res.status(StatusCodes.OK).json({
            data: {
                errorMessage: "Password and Confirm Password does not match",
                errorCode: "auth0001"
            }
        })
    }
}