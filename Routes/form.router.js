import { Router } from "express";
import { formData,getAllData } from "../controller/form.controller.js";

const router =Router()
router.route("/form").post(formData)
router.route("/alldata").get(getAllData)
export default router;