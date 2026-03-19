import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"



const register = async (req, res) => {

    const { username, email, password, role = "user" } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username, email, password: hash, role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

const login = async (req, res) => {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User logged in succefully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
}

const logout = async (req, res) => {
    res.clearCookie("token")
        res.status(200).json({
            message: "suer logged out successfully"
        })
}
export default { register, login, logout }