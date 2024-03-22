const bcrypt = require('bcryptjs');
const Shopkeepers = require("../../../data/models/shopkeeper/shopkeeper");
const { create_shopkeeper_id } = require('../../../middleware/common');
const { StatusCodes } = require("http-status-codes");
const { email_verification_body } = require('../../../data/objects/mail/mailBody');
const { _sendMail } = require('../../../utils/send_email');
const MailSync = require('../../../data/models/auth/mailSync');

exports.register_shopkeeper = async (req, res) =>{
    const reqData = req.body;

    // will encrpt the password by importing the bcript
    if (reqData.password == reqData.confirmPassword) {
        reqData.password = await bcrypt.hashSync(reqData.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));

       //generate id 
        let shopkeeper_id;

       // will check either the givin email is already recorded in shopkeepers model or not, if not then register 
        let data = await Shopkeepers.findOrCreate({
            where: {
                email: reqData.email
            },
            //includes all colums without auto generated one that is ID
            defaults: {
                firstname: reqData.firstname,
                lastname: reqData.lastname,
                email: reqData.email,
                password: reqData.password,
                phone: reqData.phone,
                cnic: reqData.cnic,
                profile_picture: reqData.profile_picture,
                cnic_front: reqData.cnic_front,
                verified: false,
                type: reqData.type
            },
            attributes: { exclude: ['password'] }
        })
        // if the record is fou in the model then will not create an other record with same email, else create a new one with the email.
        .then(async ([data, isCreated]) => {
                if (isCreated == false) {
                    return res.status(StatusCodes.CONFLICT).json({
                        data: {
                            error: {
                                error: "Email is already registered!"
                            }
                        }
                    });
                } else if (isCreated == true) {
                    try {
                        email_verification_body.to = data.email;
                        email_verification_body.text = `${process.env.BASE_URL}/shopkeeper/verifyShopkeeker?id=${data.shopkeeper_id}`;
                        await _sendMail(email_verification_body);
                        //saving status of mail
                        const mail = await MailSync.create({
                            mail_type: "Verification Account",
                            shopkeeper_id: data.shopkeeper_id,
                            status:"Synced"
                        },{
                            attributes: { exclude: ['mail_id', 'shopkeeper_id'] }
                        })
                        .then(async (mail)=>{
                            data.mail = mail.dataValues
                        })
                    } catch (error) {
                        const mail = await MailSync.create({
                            mail_type: "Verification Account",
                            shopkeeper_id: data.shopkeeper_id,
                            status:"Sync Failed"
                        },{
                            attributes: { exclude: ['mail_id', 'shopkeeper_id'] }
                        })
                        .then(async (mail)=>{
                            data.mail = mail.dataValues
                        })
                    }

                    return res.status(StatusCodes.OK || StatusCodes.GATEWAY_TIMEOUT).json({
                        data: {
                            responseMessage: " Account created successfully. Please check email for Account Verification",
                            Shopkeeper: data.dataValues,
                            mail: data.mail
                        }
                    })
                }
            }).catch((err) => {
                return res.status(err.status || 500).json({
                    data: {
                        error: {
                            errorMessage: "Account not created",
                            err: err.message
                        }
                    }
                });
            });
    }

}