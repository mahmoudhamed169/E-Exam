const Level = require("../model/levelModel");
const { StatusCodes } = require("http-status-codes");

const getAllLevels = async (req, res) => {
  const levels = await Level.find({}).populate("createdBy");
  res.json({ massege: "allLevels", levels });
};

const addNewLevel = async (req, res) => {
  let { levelName } = req.body;     
  if(theUser.role == "admin"){
    try {
      const level = await Level.findOne({ levelName });
      if (level) {
        res.status(StatusCodes.BAD_REQUEST).json({
          massege: "This Level is already existes",
        });
      } else {
        let newlevel = new Level({ levelName , createdBy:theUser._id});
        await newlevel.save()
        res.json({ massege: "Added success", level: newlevel });
        console.log(theUser._id)
      }
    } catch (error) {
      console.log(error);
    }

  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
  }
  

};

module.exports = {
  getAllLevels,
  addNewLevel,
};



