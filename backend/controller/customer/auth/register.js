const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const { email_verification_body } = require('../../../data/objects/mail/mailBody');
const { _sendMail } = require('../../../utils/send_email');
const Users = require('../../../data/models/customer/auth/users');
const MailSync = require('../../../data/models/mailSync');
exports.register_User = async (req, res) => {
    const reqData = req.body;

    if (reqData.password == reqData.confirmPassword) {
        try {
            reqData.password = await bcrypt.hashSync(reqData.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));
        } catch (error) {

            return res.status(StatusCodes.NOT_FOUND).json({
                data: {
                    errorMessage: 'Unable to create account',
                    errorCode: 'auth0002'
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
                profile_picture: reqData.profile_picture,
                verified: false,
                type: reqData.type
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
                    try {
                        email_verification_body.to = data.email;
                        email_verification_body.text = `${process.env.BASE_URL}/user/verifyUser?id=${data.user_id}`;
                        await _sendMail(email_verification_body);

                        //saving status of mail
                        const mail = await MailSync.create({
                            mail_type: "Verification Account",
                            user_id: data.user_id,
                            status: "Synced"
                        }, {
                            attributes: { exclude: ['mail_id', 'user_id'] }
                        })
                            .then(async (mail) => {
                                data.mail = mail.dataValues
                            })

                    } catch (error) {
                        //log mail send failed in database and make it auto sync after some time
                        // return res.status(error.status || StatusCodes.GATEWAY_TIMEOUT).json({
                        //     data: {
                        //         error: {
                        //             errorMessage: "Verification mail sending failed"
                        //         }
                        //     }
                        // })
                        const mail = await MailSync.create({
                            mail_type: "Verification Account",
                            user_id: data.user_id,
                            status: "Sync Failed"
                        }, {
                            attributes: { exclude: ['mail_id', 'user_id'] }
                        })
                            .then(async (mail) => {
                                data.mail = mail.dataValues
                            })
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
                return res.status(err.status || 500).json({
                    data: {
                        errorMessage: "Account not created. Please try again",
                        errorCode: "auth0005"
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