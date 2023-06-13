const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

function authenticateToken(req, res, next) {

    dotenv.config();
    let secret = process.env.SECRET_TOKEN;

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null){ 
    console.log("token"+token)
    return res.sendStatus(401)
    }
    jwt.verify(token, secret, async (err, user) => {
        
        if (err) {
        return res.json(err)
        }

        console.log(authHeader)
        console.log(token)
        req.user = user
        
        next()
    })
}

module.exports = authenticateToken;