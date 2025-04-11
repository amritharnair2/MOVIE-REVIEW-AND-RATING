const adminDb = require("../models/adminModel");
const createToken = require("../utilities/generateToken");
const { hashPassword, comparePassword } = require("../utilities/passwordUtilities");

// const register = async (req,res) => {
//     try {
//         const {email, password} = req.body;
        
//         if(!email || !password ) {
//             return res.status(400).json({error: "All fields are required"})
//         }

//         const adminExist = await adminDb.findOne({email}) 
//         if(adminExist) {
//             return res.status(400).json({error: "Email already exist"})
//         }

//         const hashedPassword = await hashPassword(password)

//         const newAdmin = new adminDb ({
//             email, password: hashedPassword
//         })

//         const savedAdmin = await newAdmin.save()
//         if(savedAdmin) {
//             const token = createToken(savedAdmin._id)
//             res.cookie("token", token)
//             return res.status(200).json({message: "Admin created successfully", savedAdmin})
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(error.status || 500).json({error: error.message || "Internal server error"})
//     }
// }



const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({error: "All fields are required"})
        }

        const admin = await adminDb.findOne({email}) 
        if(!admin) {
            return res.status(400).json({error: "Admin not found"})
        }

        const passwordMatch = await comparePassword(password, admin.password)
        if(!passwordMatch) {
            return res.status(400).json({error: "Password doesnot match"})
        }

        const token = createToken(admin._id, "admin")
        res.cookie("Admin_token", token)
        return res.status(200).json({message: "Admin login successfull", admin, token})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

const logout = async (req,res) => {
    try {
        res.clearCookie("Admin_token")
        return res.status(200).json({message: "Admin logout successfull"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}


module.exports = {login, logout}