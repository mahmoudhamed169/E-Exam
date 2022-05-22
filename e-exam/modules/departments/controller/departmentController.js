const Department = require("../model/departmentModel");
const { StatusCodes } = require("http-status-codes");

const getAllDepartment = async (req, res) => {
  const departments = await Department.find({}).populate("createdBy");
  res.json({ message: "All Department", data: departments });
};

const addNewDepartment = async (req, res) => {
  let { departmentName } = req.body;
  if(theUser.role == "admin"){
    try {
      const department = await Department.findOne({ departmentName });
      if (department) {
        res.status(StatusCodes.BAD_REQUEST).json({
          massege: "department is already existes",
        });
      } else {
        let newDepartment = new Department({ departmentName});
        await newDepartment.save();
        res.json({ massege: "Added success", Department: newDepartment });
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
  getAllDepartment,
  addNewDepartment,
  
};

