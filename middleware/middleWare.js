// const jwt = require('jsonwebtoken')

// const jwtMiddleWare = (req,res,next)=>{
//     console.log("inside jwtMiddleWare");
    
//     // logic authorized user
//     const token = req.headers["authorization"].split(" ")[1]
//     console.log(token);
//     if(token){
//         // verify token
//         try{
//             const jwtResponse =jwt.verify(token,process.env.JWTPASSWORD)
//          console.log(jwtResponse);
//          req.userId=jwtResponse.userId
//          next()
         
//         }catch(err){
//             res.status(401).json("Authorization failed ...please login")
//         }
//     }else{
//         res.status(404).json("authorization failed token is missing")
//     }
    

// }
// module.exports = jwtMiddleWare
const jwt = require("jsonwebtoken");

const jwtMiddleWare = (req, res, next) => {
    console.log("Inside jwtMiddleWare");

    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization failed: Token is missing" });
    }

    const token = authHeader.split(" ")[1]; // Ensure "Bearer token"
    if (!token) {
        return res.status(401).json({ message: "Authorization failed: Invalid token format" });
    }

    try {
        const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
        console.log("Decoded JWT:", jwtResponse);

        if (!jwtResponse.userId) {
            return res.status(401).json({ message: "Authorization failed: Invalid token data" });
        }

        req.userId = jwtResponse.userId; // Ensure this is correctly stored
        next();
    } catch (err) {
        return res.status(401).json({ message: "Authorization failed: Invalid or expired token" });
    }
};

module.exports = jwtMiddleWare;
