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

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"});
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 6 characters, include letters, numbers and a special character"});
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
            //res.cookie("token", token)
            return res.status(201).json({message: "User created successfully", savedUser, token})
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
            return res.status(400).json({error: "Incorrect Password"})
        }

        const userObject = userExist.toObject()
        delete userObject.password

        const token = createToken(userExist._id)
        //res.cookie("token", token)
        return res.status(200).json({message: "Login successfull", userObject, token})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//user profile
const userProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await userDb.findById(userId).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

//update user
const updateUser = async (req, res) => {
    try {
        const userId = req.user
        const updatedUser = await userDb.findByIdAndUpdate(userId, req.body, { new: true })
        res.status(200).json({ message: "user updated", updatedUser })
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

//delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid id" })
        }

        await userDb.findByIdAndDelete(userId)
        return res.status(200).json("user deleted")
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
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
    deleteUser,
    userProfile
}
