const Mail = require("../data/models/sync/mail")

exports.save_mails = async (value) => {
    let data;
    await Mail.create(
        {
            from: value.from,
            to: value.to,
            subject: value.subject,
            text: value.text,
            reason: value.reason,
            type: value.type,
            status: value.status
        }
    )
        .then(async (mail) => {
            data = mail.toJSON()
        })
        .catch(async (error) => {
            throw error
        })
        return data

    // try {
    //     const mail = await Mail.create({
    //         from: value.from,
    //         to: value.to,
    //         subject: value.subject,
    //         text: value.text,
    //         reason: value.reason,
    //         type: value.type,
    //         status: value.status
    //     });
    //     return mail.toJSON(); // Convert the Sequelize instance to JSON
    // } catch (error) {
    //     throw error;
    // }
}