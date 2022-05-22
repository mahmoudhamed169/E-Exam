const { getAllUsers, addNewUser ,sign_up,sign_in } = require("../controller/userController");
const isAuthenticated = require("../../../common/isAuthrized");
const validateRequest = require("../../../common/validtateReq");
const { singUpSchema, singInSchema  , getAllProfessors} = require("../joi/userValidation");

const router = require("express").Router();



router.get("/users" , getAllUsers);
// router.post("/addUser" ,validateRequest(addUserSchemaa) ,addNewUser) ; 
router.post("/sign_Up", validateRequest(singUpSchema), sign_up);
router.post("/sign_In", validateRequest(singInSchema), sign_in);

router.get("/prof" , getProfessors); 
module.exports = router;

