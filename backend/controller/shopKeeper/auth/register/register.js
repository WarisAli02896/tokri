const { hashSync, genSaltSync } = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const ShopKeeper = require("../../../../data/models/shopKeeper/auth/shopKeeper");
const { email_verification_body } = require("../../../../data/objects/mail/mailBody");
const { _sendMail } = require("../../../../utils/send_email");
const Mail = require("../../../../data/models/sync/mail");
const { encrypt_Url, encrypt } = require("../../../../middleware/urlEncryption");

exports.register_shopkeeper = async (req, res) => {
    const reqData = req.body;

    if (reqData.password == reqData.confirmPassword) {
        reqData.password = hashSync(reqData.password, genSaltSync(parseInt(process.env.SALT)));

        await ShopKeeper.findOrCreate({
            where: {
                email: reqData.email
            },
            defaults: {
                firstname: reqData.firstname,
                lastname: reqData.lastname,
                email: reqData.email,
                password: reqData.password,
                phone: reqData.phone,
                cnic: reqData.cnic,
                ntn: reqData.ntn,
                profile_picture: reqData.profile_picture,
                cnic_back: reqData.cnic_back,
                cnic_front: reqData.cnic_front
            }
        })
            .then(async ([data, isCreated]) => {
                if (isCreated == false) {
                    return res.status(StatusCodes.CONFLICT).json({
                        data: {
                            errorMessage: "Email already registered!",
                            errorCode: "auth0004"
                        },
                    })
                } else if (isCreated == true) {
                    // const str = "shaikh"
                    try {
                        //Make shopkeeper id encrypt before sending it to url
                        const id = await encrypt(data.dataValues.shopKeeper_id);

                        email_verification_body.to = data.dataValues.email;
                        email_verification_body.text += `/n${process.env.BASE_URL}/user/verify?id=${id}&type=ShopKeeper`
                        await _sendMail(email_verification_body);

                        await Mail.create({
                            from: email_verification_body.from,
                            to: email_verification_body.to,
                            subject: email_verification_body.subject,
                            text: email_verification_body.text,
                            reason: `Account verification mail sent to shopkeeper/n ShopKeeper_id:${data.dataValues.shopKeeper_id}`,
                            type: 'Keeper Account Verification',
                            status: true
                        })
                            .then(async (mail) => {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        responseMessage: "Account created successfully. Please check email for account verification",
                                        responseCode: "auth0005",
                                        ShopKeeper: data.dataValues,
                                        Mail: mail
                                    }
                                })
                            })
                            .catch(async (error) => {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        responseMessage: "Account created successfully. Please check email for account verification",
                                        responseCode: "auth0005",
                                        ShopKeeper: data.dataValues
                                    }
                                })
                            })
                    } catch (error) {
                        await Mail.create({
                            from: email_verification_body.from,
                            to: email_verification_body.to,
                            subject: email_verification_body.subject,
                            text: email_verification_body.text,
                            reason: `Account verification mail sent to shopkeeper/n ShopKeeper_id:${data.dataValues.shopKeeper_id}`,
                            type: 'Keeper Account Verification',
                            status: false
                        })
                            .then(async (mail) => {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        responseMessage: "Account created successfully. Please check email for account verification",
                                        responseCode: "auth0005",
                                        ShopKeeper: data.dataValues,
                                        Mail: mail
                                    }
                                })
                            })
                            .catch(async (error) => {
                                return res.status(StatusCodes.OK).json({
                                    data: {
                                        responseMessage: "Account created successfully. Please check email for account verification",
                                        responseCode: "auth0005",
                                        ShopKeeper: data.dataValues
                                    }
                                })
                            })
                    }
                }
            })
            .catch(async (error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    data: {
                        errorMessage: "Account not Created! Please try again/n",
                        errorCode: "auth0000",
                        error: {
                            message: error.message,
                            error
                        }
                    }
                })
            })

    } else if (reqData.password != reqData.confirmPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {
                errorMessage: "Password and Confirm Password does not match",
                errorCode: "auth0006"
            }
        })
    }
}