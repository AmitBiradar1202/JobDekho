import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary"

export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);


export const postJob=catchAsyncErrors(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }

    if(!req.files || Object.keys(req.files).length===0){
      return next(new ErrorHandler("Resume file required"))
    }

    const {resume}=req.files;
    const allowedFromats=["image/png","image/jpg","image/wep","file/pdf"]
  if(!allowedFromats.includes(resume.mimetype)){ ///means if conatains image/png","image/jpg","image/wep","file/pdf or not
    return next(new ErrorHandler("Invalid  file format"))
  
  }

  const cloudinaryReponse=await cloudinary.UploadStream.upload(
    resume.tempFilePath
  )
  if(!cloudinaryReponse || cloudinaryReponse.error ){
        console.error(
          "cloudinary Error",
          cloudinaryReponse.error ||"Unkown error cloudinaryReponse"
        )
        return next(new ErrorHandler("Invalid  file formatFailed to upload file"))
  
  }


  const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantID ||
      !employerID ||
      !resume
    ) {
      return next(new ErrorHandler("Please fill all fields.", 400));
    }

    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
})

export const getUser=catchAsyncErrors((req,res,next)=>{
  const user=req.user;
  res.status(200).json({
    user,
    success:true
  })
})