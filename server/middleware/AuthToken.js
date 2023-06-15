const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const authenticateToken =(req, res, next)=> {

    dotenv.config();
    let secret = process.env.SECRET_TOKEN;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null){ 
    console.log("middleware tidak ada token ="+token)
    return res.sendStatus(401)
    }
    jwt.verify(token, secret, async (err, user) => {
        
        if (err) {
        return res.json("Middleware salah")
        }
        console.log("ini token di middleware = "+"-"+user.user_id)
        req.user = user
        
        next()
    })
}

module.exports = authenticateToken;