import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import logo from "@/assets/logouser.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import Header from "../shared/Header";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const ManageJobs = () => {
   useGetAllAdminJobs(); 
  const { allAdminJobs } = useSelector(store=>store.job);

  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="flex ">
        <div className="w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full p-[25px_20px] bg-gray-100 h-screen max1024:w-full">
          <div>
            <h1 className="text-2xl my-2">Job Dashboard</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>
          </div>
          <Table className="border my-6 bg-[#fff]">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-[#333] text-white">Title</TableHead>
                <TableHead className="bg-[#333] text-white">Company name</TableHead>
                <TableHead className="bg-[#333] text-white">Date</TableHead>
                <TableHead className="text-right text-white bg-[#333]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAdminJobs?.map((job) =>(
                <tr>
                    <TableCell>
                      {job?.title}
                    </TableCell>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          {/*<div className="flex gap-2 cursor-pointer" onClick={()=>navigate(`/admin/job/${job._id}`)}>
                            <Edit2 className="w-4 " />
                            <span>Edit</span>
                          </div>*/}
                          <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2 ">
                            <Eye className="w-4"  />
                            <span>Applications</span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    </tr>
                )
              )}
            </TableBody>
          </Table>
          <Button
            onClick={() => navigate("/admin/submitjobs")}
            className="bg-green-600 text-white my-1 max560:w-full"
          >
            Add Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
