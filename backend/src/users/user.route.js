const express =  require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router =  express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) => {
    const {username, password} = req.body;
    try {
        const admin =  await User.findOne({username});
        if(!admin) {
            res.status(404).send({message: "Admin not found!"})
        }
        if(admin.password !== password) {
            res.status(401).send({message: "Invalid password!"})
        }

        return res.status(200).json({
            message: "Authentication successful",
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
       console.error("Failed to login as admin", error)
       console.log("password: ", password);
       console.log("username: ", username);
       res.status(401).send({message: "Failed to login as admin"}) 
    }
})

module.exports = router;
// const express = require('express');
// const User = require('./user.model');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// // Route tạo tài khoản admin trực tiếp
// router.post("/create-admin", async (req, res) => {
//     const { username, password, role } = req.body;

//     try {
//         // Kiểm tra xem admin đã tồn tại chưa
//         const existingAdmin = await User.findOne({ username });
//         if (existingAdmin) {
//             return res.status(400).send({ message: "Admin account already exists!" });
//         }

//         // Tạo tài khoản admin mới
//         const newAdmin = new User({
//             username,
//             password,  // Lưu mật khẩu trực tiếp, không mã hóa
//             role: role || 'admin'  // Mặc định vai trò admin
//         });

//         await newAdmin.save();

//         return res.status(201).send({ message: "Admin account created successfully!" });

//     } catch (error) {
//         console.error("Error creating admin account", error);
//         res.status(500).send({ message: "Failed to create admin account" });
//     }
// });

// module.exports = router;
