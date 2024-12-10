import { Job } from "../models/job.model.js";

//admin post krega job
export const postJob=async(req,res)=>{
    try{
        const {title,description,requirements,salary,location,jobType,experience,position,companyId,category}=req.body;
        const userId=req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId  || !category){
            return res.status(400).json({
                message:"Something is missing.",
                success:false
            })
        };
        const job= await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            category,
            company:companyId,
            created_by:userId
        })
        return res.status(201).json({
            message:"New job created successfully.",
            job,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

//candidate
export const getAllJobs= async (req,res)=>{
    try{
        const keyword= req.query.keyword || "";
        const category = req.query.category || "";  // Get category from the query
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
            // If a category is provided, add it to the query
            if (category) {
                query.category = category;  // Assuming 'category' is a field in your Job model
            }
        const jobs= await Job.find(query).populate({
            path:'company'
        }).sort({createdAt:-1});
        if(!jobs){
            return req.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
        console.log(error);
    }
}

export const getJobById= async(req,res)=>{
    try{
        const jobId= req.params.id;
        const job= await Job.findById(jobId).populate([
            { path: "company" }, 
            { path: "applications" },
          ]);
        if(!job){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        });

    }catch(error){
        console.log(error)
    }
}

//admin kitne job create krta hai abhi tak

export const getAdminJobs= async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    }catch(error){
        console.log(error)
    }
}