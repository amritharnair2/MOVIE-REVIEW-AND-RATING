const userDb = require("../models/userModel");
const createToken = require("../utilities/generateToken");
const { hashPassword, comparePassword } = require("../utilities/passwordUtilities");

//Register for new user
const register = async (req,res) => {
    try {
        const {name, email, password, confirmpassword} = req.body;
        console.log(req.body)
        if(!name || !email || !password || !confirmpassword ) {
            return res.status(400).json({error: "All fields are required"})
        }

        if(password !== confirmpassword)
        {
            return res.status(400).json({error: "Passwords doesnot match"})
        }

        const userExist = await userDb.findOne({email}) 
        if(userExist) {
            return res.status(400).json({error: "Email already exist"})
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new userDb ({
            name, email, password: hashedPassword
        })

        const savedUser = await newUser.save()
        if(savedUser) {
            const token = createToken(savedUser._id)
            res.cookie("token", token)

            return res.status(200).json({message: "User created successfully", savedUser})
        }

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//login for existing user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({error: "All fields are required"})
        }

        const userExist = await userDb.findOne({email}) 
        if(!userExist) {
            return res.status(400).json({error: "User not found"})
        }

        const passwordMatch = await comparePassword(password, userExist.password)
        if(!passwordMatch) {
            return res.status(400).json({error: "Password doesnot match"})
        }
        const token = createToken(userExist._id)
        res.cookie("token", token)
        return res.status(200).json({message: "User login successfull", userExist})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, confirmpassword } = req.body
    
        let user = await userDb.findById(id);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        if (password && confirmpassword) {
          if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
          }
          user.password = await hashPassword(password);
        
        if (name) user.name = name;
        if (email) user.email = email;
    
        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully", updatedUser })
    } 
}catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//delete user
const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await userDb.findByIdAndDelete(id);
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//logout
const logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "User logout successfull"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {
    register,
    login,
    logout,
    updateUser,
    deleteUser
}
