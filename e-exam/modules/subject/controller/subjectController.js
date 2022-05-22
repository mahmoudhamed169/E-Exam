const { StatusCodes } = require("http-status-codes");
const Subject = require("../model/subjectModel");

const getAllsubject = async (req, res) => {
  const subjects = await Subject.find({}).populate('prof').populate('department').populate('level');
  res.json({ message: "All Department", data: subjects });
};

const getStudentSubjects = async (req, res) => {
 try {
  const subjects = await Subject.find({ department :theUser.department,level :theUser.level}); 
  res.json({ message: " subjects", data: subjects });
 }
  catch (error) {
  console.log(error);
}
  
};

const addNewSubject = async (req, res) => {
  let { subjectName, department,level ,prof } = req.body;
  if(theUser.role == "admin"){
    try {
      const subject = await Subject.findOne({ subjectName,department,level });
      if (subject) {
        res.status(StatusCodes.BAD_REQUEST).json({
          massege: "subject is already existes",
        });
      } else {
        let newsubject = new Subject ({ subjectName, department,level ,prof });
        await newsubject.save();
        res.json({ massege: "Added success",  newsubject });
      }
    } catch (error) {
      console.log(error);
    }
  }else {
    res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"})
  }
  
};



const getTeacherSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ prof :theUser._id}); 
    res.json({ message: " subjects", data: subjects });
  }
    catch (error) {
    console.log(error);
  }
};



module.exports = {
    getAllsubject,
    getStudentSubjects,
    addNewSubject,
    getTeacherSubjects
};
