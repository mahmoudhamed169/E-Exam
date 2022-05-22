const { getAllDepartment, addNewDepartment, getSpacificDepartment } = require("../controller/departmentController");
const validtateReq = require('../../../common/validtateReq');
const { addDepartentSchemaa,getSpacificDepartmentSchema } = require("../joi/departmentValidation");
const isAuthenticated = require("../../../common/isAuthrized")

const router = require("express").Router();


router.get("/departments" , getAllDepartment);
router.post("/addDepartment" ,validtateReq(addDepartentSchemaa), isAuthenticated(),addNewDepartment);







module.exports = router