// Import the User model and required libraries
const UserModel = require('./User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Login controller
exports.LoginController = async (req, res) => {
    // Extract email and password from request body
    const { username, password } = req.body;
    try {
        // Find a user with the provided email in the database
        const userpersent = await UserModel.findOne({ userName: username });
        console.log(userpersent)
        // If no user is found, send a 401 Unauthorized status code
        if (!userpersent) {
            return res.status(401).send({ message: 'Incorrect username' });
        }
        // Check if the password provided matches the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, userpersent.password);
        if (!isPasswordCorrect) {
            // If the password does not match, send a 401 Unauthorized status code
            return res.status(401).send({ message: 'Incorrectpassword' });
        }
        // If the email and password are correct, create a JWT token and send it to the client
        const token = jwt.sign(
            {
                email: userpersent.email,
                fullName: userpersent.fullName,
                userName: userpersent.userName,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7 days' }
        );
        // Send a success response with the tokens and user data
        return res.status(200).send({ token, userpersent, message: 'Login successful' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};

// Signup controller
exports.RegisterController = async (req, res) => {
    // Extract name, email, and password from request body
    const { fullName, userName, email, password, avatar } = req.body;
    try {
        // Check if a user with the provided email already exists in the database
        const exsistinguser = await UserModel.findOne({ email });
        if (exsistinguser) {
            // If a user already exists, send a 409 Conflict status code
            return res.status(409).send({
                message: 'User already exists',
            });
        }
        // Hash the password and create a new user in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            avatar: avatar
        });
        // Send a success response with the newly created user data
        return res.status(201).send({
            user: newUser,
            message: 'User has register Successfully !',
        });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};


// Update password controller
exports.UpdatePasswordController = async (req, res) => {
    // Extract the user ID and password from the request body
    const { oldPassword, newPassword } = req.body;
    let { token } =req.headers;
    let decode=jwt.decode(token,process.env.JWT_SECRET);
    try {
        // Find the user in the database by their ID
        const user = await UserModel.findOne({ email: decode.email });
        if (!user) {
            // If no user is found, send a 404 Not Found status code
            return res.status(404).send({ message: 'User not found' });
        }
        // Check if the old password provided matches the hashed password in the database
        const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordCorrect) {
            // If the old password does not match, send a 401 Unauthorized status code
            return res.status(401).send({ message: 'Incorrect old password' });
        }
        // Hash the new password and update the user's password in the database
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        // Send a success response
        return res.status(200).send({ message: 'Password updated successfully' });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};


// Profile Update controller
exports.ProfileUpdateController = async (req, res) => {
    // Extract user ID, full name, and avatar URL from request body
    const { fullName, avatar } = req.body;
    let {token}=req.headers;
    let decode=jwt.decode(token,process.env.JWT_SECRET);

    try {
        // Find the user in the database by their ID
        const user = await UserModel.findOne({email:decode.email});
        if (!user) {
            // If no user is found, send a 404 Not Found status code
            return res.status(404).send({ message: 'User not found' });
        }
        // Update the user's full name and avatar URL in the database
        user.fullName = fullName;
        user.avatar = avatar;
        await user.save();
        // Send a success response with the updated user data
        return res.status(200).send({
            user: user,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error status code with the error message
        return res.status(500).send(error.message);
    }
};