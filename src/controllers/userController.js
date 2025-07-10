import { response } from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import userModel from "../models/Users/userModel.js";


const createToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User with email " + email + " does not exists. You need to register first." })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "You are entering a wrong password." })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// Route for user Registration

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ success: false, message: "User with email " + email + " already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please use a valid email address" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be more then 8 characters." })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel(
            {
                firstName, lastName, email, password: hashedPassword
            }
        )

        const user = newUser.save()

        const token = createToken((await user)._id)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Route for admin Login

const adminLogin = async (req, res) => {
    res.json("Admin Login")
}
export { loginUser, registerUser, adminLogin }