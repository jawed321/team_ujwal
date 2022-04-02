
import express from "express";

const router = express.Router();

import { signin, signup, getUserdetail,updateProfile,changePassword } from "../controllers/user.js";
import auth from "../middleware/auth.js";

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/editprofile',auth, updateProfile);
router.patch('/changepassword',auth, changePassword);
router.get('/',auth,getUserdetail);



//>>>>>>> 2caa6dec692bef90e317bbe0a30782a2aac86ec7
export default router