import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Form } from "../FormModel/form.model.js";


const formData=asyncHandler(async(req,res)=>{
  const {FullName,Email,Number,Age,City,DOB}=req.body;
  console.log("Email : ",FullName,Email,Number,Age,City,DOB)
  console.log(req.body);

if([FullName,Email,Number,Age,City,DOB].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"All fields are required.")
}
try {
    const form=new Form({
        FullName:FullName,
        Email:Email,
        Number:Number,
        Age:Age,
        City:City,
        DOB:DOB
    })
    await form.save();
    await console.log(form,"form data");
    return res
    .status(201)
    .json(
        new ApiResponse(200,form,"FormData SuccessFully submit")
    )
} catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.Email) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
}

})

const getAllData=asyncHandler(async(req,res)=>{
    try {
        const data=await Form.find()
        return res.status(200).json(data)
        
    } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
        
    }
})

const deleteData = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.query; 
      const data = await Form.findByIdAndDelete(_id);
      if (!data) {
        return res.status(404).json({ message: 'Data not found' });
      }
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  const editData=asyncHandler(async(req,res)=>{
    try {
       const {_id}=req.query;
       const newData=req.body;
       const updateData=await Form.findByIdAndUpdate(_id,newData,{new:"true"});
       if(!updateData){
        return res.status(404).json({message:"Data not found"});
       }
       res.status(200).json({ message: 'Data updated successfully', data: updateData });

    } catch (error) {
      return res.status(500).json({message:"Internal server error"});
    }
  })
  

 export {formData,getAllData,deleteData,editData};