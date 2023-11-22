import Express from 'express';
const router = Express.Router();
import {createUser, getAllUsers} from "../controllers/control.js"

router.get('/get',getAllUsers);

router.post("/create",createUser)


export default router;