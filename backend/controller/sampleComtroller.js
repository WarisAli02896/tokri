

exports.sampleFunction = (req, res) => {
   console.log("hello");
    console.log("New code");
    try{
        require("../models/auth/users");
        return res.status(200).json({
            data:{
                message: "Sample function is working"
            }
        })
        console.log("hjvfhygyu");
    }catch(error){
        return res.status(404).json({
            data:{
                message: `${error}`
                
            }
        })
        console.log("vcdxdse");
    }
}