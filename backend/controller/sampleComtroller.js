

exports.sampleFunction = (req, res) => {
   console.log("hello");
    try{
        require("../models/auth/users");
        return res.status(200).json({
            data:{
                message: "Sample function is working"
            }
        })
    }catch(error){
        return res.status(404).json({
            data:{
                message: `${error}`
                
            }
        })
    }
}