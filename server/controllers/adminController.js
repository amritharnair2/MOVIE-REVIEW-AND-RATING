const userDb = require("../models/userModel");
const createToken = require("../utilities/generateToken");
const { comparePassword } = require("../utilities/passwordUtilities");


const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({error: "All fields are required"})
        }

        const admin = await userDb.findOne({email}) 
        if (!admin || admin.role !== 'admin') {
            return res.status(400).json({ error: 'Admin credentials are incorrect' });
          }

        const passwordMatch = await comparePassword(password, admin.password)
        if(!passwordMatch) {
            return res.status(400).json({error: "Incorrect Password"})
        }

        const adminObject = admin.toObject()
        delete adminObject.password

        const token = createToken(admin._id)
        return res.status(200).json({message: "Login successfull", adminObject, token})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {
    adminLogin
}