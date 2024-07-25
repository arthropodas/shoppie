const jwt = require("jsonwebtoken")
const generateToken =(data)=>{


    const{firstName,lastName,cust_id}=data
    const accessToken = jwt.sign({
                    user:{
                        firstName: firstName,
                        custId: cust_id
                    }
                },process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn:'1m'
                })
                const refreshToken = jwt.sign({
                  user: {
                      firstName: firstName,
                      custId: cust_id,
                  }
              }, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn: '2m'
              });

              return {accessToken,refreshToken}

}

module.exports={generateToken}