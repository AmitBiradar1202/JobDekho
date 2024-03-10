import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();


router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);

export default router;