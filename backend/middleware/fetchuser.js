const jwt = require('jsonwebtoken');
const JWT_Secret = "iNoteBookSecret";

const fetchuser = (req,res,next) => {

    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error:"Login Using valid Credentials"});
    }

    try {
        const data = jwt.verify(token,JWT_Secret);
        req.user = data.user;
        next();        
    } catch (error) {
        res.status(400).send({error});
    }

}

module.exports = fetchuser;