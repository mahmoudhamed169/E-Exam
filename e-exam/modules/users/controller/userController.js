const User = require("../model/userModel");
const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate("level").populate("department").select("-password");
  res.json({ massege: "allUsers", users });
};

const sign_up = async (req, res) => {
  let { fristName, lastName, email, level, department, password, role } =
    req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        massege: "email is already existes",
      });
    } else {
      let newUser = new User({
        fristName,
        lastName,
        email,
        level,
        department,
        password,
        role,
      });
      await newUser.save();
      res.status(StatusCodes.CREATED).json({ massege: "resgisted success" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ massge: "error", error });
    console.log(error);
  }
};

const sign_in = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ massege: "Invalid Email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(
          { _id: user._id, role: user.role, level : user.level, department :user.department },
          "shhhhh"
        );
        res.status(StatusCodes.OK).json({
          token,
          user: {
            
            name: user.fristName + " " + user.lastName,
            email: user.email,
            level : user.level, 
            department :user.department , 
          },
        });
      } else {
        res.json({ massge: "password is not corrected" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ massge: "error", error });
  }
};

getProfessors = async (req, res) => {
 try {
  const users = await User.find({ role: "professor" }).select("-password");
  res.json({ massege: "allUsers", users });
} catch (error) {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ massge: "error", error });
}
};










module.exports = {
  getAllUsers,
  //   addNewUser,
  
  sign_up,
  sign_in,
  getProfessors,
};
