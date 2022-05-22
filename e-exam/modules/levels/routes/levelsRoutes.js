const validtateReq = require('../../../common/validtateReq');
const { getAllLevels, addNewLevel } = require('../controller/levelController');
const { addLevelSchemaa } = require('../joi/levelValidation');
const isAuthenticated = require("../../../common/isAuthrized")

const router = require('express').Router();



router.get("/levels" , getAllLevels) ; 
router.post("/addLevels" ,validtateReq(addLevelSchemaa), isAuthenticated() , addNewLevel );

module.exports = router ;