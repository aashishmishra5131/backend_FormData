import { Router } from "express";
import { formData,getAllData,deleteData, editData } from "../controller/form.controller.js";

const router =Router()
router.route("/form").post(formData)
router.route("/alldata").get(getAllData)
router.route("/delete").delete(deleteData)
router.route("/edit").put(editData)
export default router;