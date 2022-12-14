const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY


const auth = (req, res, next) => {
    try {
      let token = req.headers.authorization;
      if (token) {
        token = token.split(" ")[1];
        let user = jwt.verify(token, "Prathmesh@425001");
        req.userId = user.id;/* Add new parameter in header to indicate that this particular note belongs to this particular User*/
      } else {
        return res.status(401).json({ message: "Unauthoruzed User!" });
      }
  
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthoruzed User!" });
    }
  };
  
  module.exports = auth;
  