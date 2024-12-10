
import React, { useState } from "react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const SubmitJobs=()=>{
  useGetAllAdminJobs()
  const navigate=useNavigate()
  const [input,setInput]=useState({
    title:"",
    description:"",
    requirements:"",
    salary:"",
    location:"",
    jobType:"",
    experience:"",
    category:"",
    position:0,
    companyId:""
  });
  const [loading,setLoading]=useState(false);
 const {companies}=useSelector(store=>store.company);
  const changeEventHandler=(e)=>{
    setInput({...input, [e.target.name]:e.target.value});
  };

  const selectChangeHandler =(value)=>{
    const selectedCompany=companies.find((company)=>company.name.toLowerCase()===value);
    setInput({...input,companyId:selectedCompany._id})
  }

  const submitAndNavigate= async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res= await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/admin/choosepackage"); // Navigate to the next page
      }
    }catch(error){
      toast.error(error.response.data.message)
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

    return(
        <div>
        <Header/>
        <div className="flex">
        <div className="h-full w-1/5 max1024:w-0">
                <Sidebar/>
    
            </div>
            <div className="w-full p-[25px_20px] bg-gray-100 h-full max1024:w-full max560:p-[20px_10px]">
            <h1 className="text-2xl my-3  ">Post A Job</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>
            <form   className="w-full my-10 p-[20px_20px] bg-[#fff]">
   
            <div>
    
            <h1 className="text-xl my-4">Select a company</h1>
            {
              companies.length ===0 && <p className="text-xs text-red-600 font-bold text-center my-3">Please register a company first , before posting a jobs</p>
            }

          { 
            companies.length > 0 &&
            (
            <Select onValueChange={selectChangeHandler}>
            <SelectTrigger>
              <SelectValue  
              placeholder="Select Company"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  companies.map((company)=>{
                    return(

                      <SelectItem className="bg-green-500" value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                    )
                  })
                }
              </SelectGroup>
            </SelectContent>
           </Select>)}
            <hr />
            </div>
            <h1>Job Details</h1>
            <hr />
        <div className="flex w-full gap-2 max650:flex-wrap">
          <div className="w-4/5 max650:w-full">
            <label>Job Title</label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div className="w-4/5 max650:w-full">
            <label>Location (optional)</label>
            <Input
              type="text"
              
            name="location"
            placeholder="location"
              value={input.location}
             
              onChange={changeEventHandler}
            />
          </div>
        </div>
    
        {/* Location and Title */}
        <div className="flex w-full gap-2 max650:flex-wrap">
          <div className="w-4/5 max650:w-full">
            <label>Job Region</label>
            <Input
              type="text"
              name="Jobregion"  //mene add kia
              value={input.Jobregion}
              placeholder="india"
              onChange={changeEventHandler}
            />
          </div>
          <div className="w-4/5 max650:w-full">
            <label>Job Type</label>
            <Input
            type="text"
            name="jobType"
            value={input.jobType}
            onChange={changeEventHandler}
            />
          </div>
        </div>
    
        {/* Resume Category and Video */}
        <div className="flex w-full gap-2 max650:flex-wrap">
          <div className="w-4/5 max650:w-full">
            <label>Salary</label>
            <Input
              type="text"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>
          <div className="w-4/5 max650:w-full">
            <label>Experience (optional)</label>
            <Input
              type="Number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
            />
          </div>
        </div>
                {/* Resume Content */}
                <div className="flex flex-col my-2 gap-2">
          <label>Description</label>
          <textarea
            className="border px-2 py-2"
            name="description"
            value={input.description}
              onChange={changeEventHandler}
            rows="8"
            cols="100"
            required
          />
        </div>
    
        {/* Minimum Rate and Photo */}
        <div className="flex w-full gap-2 max650:flex-wrap">
          <div className="w-4/5 max650:w-full">
            <label>No of Position (optional)</label>
            <Input
              type="Number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
             
            />
          </div>
          <div className="w-4/5 max650:w-full">
            <label>Requirement (optional)</label>
            <Input
               type="text"
               name="requirements"
               value={input.requirements}
               onChange={changeEventHandler}
            />
          </div>
        </div>
        <div className="search-field">
          <label>Categories</label>
          <select
               name="category"
           value={input.category}
           onChange={changeEventHandler}
          >
             <option value="">All Category</option>
        <option value="Accounting/Finance">Accounting/Finance</option>
        <option value="Automative Jobs">Automative Jobs</option>
        <option value="Construction/Facilities">Construction/Facilities</option>
        <option value="Customer service">Customer service</option>
        <option value="Education Training">Education Training</option>
        <option value="Freshers jobs">Freshers jobs</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Part time job">Part time job</option>
        <option value="Market & Customer Research">Market & Customer Research</option>
        <option value="Others">Frontend developer</option>
        <option value="Restaurant/Food Service">Restaurant/Food Service</option>
        <option value="Sales & Marketing">Sales & Marketing</option>
        <option value="Transportation / Logistics">Transportation / Logistics</option>
        <option value="Work from home">Work from home</option>
        <option value="others">Others</option>
            {/* Add other categories as needed */}
          </select>
        </div>

        {/* Submit Button */}
        <div className="w-full flex  mt-5">
         
          {
            loading? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>: <Button  type="button"
            onClick={submitAndNavigate} className="text-white bg-green-600  py-2 rounded max560:w-full">
            Preview
        </Button>
          }
        </div>
      </form>
            </div>
        </div>
    </div>
    )
}

export default SubmitJobs;