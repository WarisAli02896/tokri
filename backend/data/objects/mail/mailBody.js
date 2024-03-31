exports.email_verification_body = {
    from:process.env.EMAIL,
    to:null,
    subject: "Account Verifation On Tokri",
    text:"Congratulation!/n Your account on tokri has been created. Click on link below to verify your email address on Tokri"
}

exports.update_email_verification_body = {
    from:process.env.EMAIL,
    to:null,
    subject: "Verification for updated email address on Tokri",
    text:"Click on link below to verify email address"
}