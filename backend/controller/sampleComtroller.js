

exports.sampleFunction = (req, res) => {
   console.log("New Line 1")
    try{
        require("../models/auth/users");
        return res.status(200).json({
            data:{
                message: "Sample function is working"
            }
        })
        console.log("New Line 3")
    }catch(error){
        return res.status(404).json({
            data:{
                message: `${error}`
                
            }
        })
        console.log("new Line 3")
    }
}