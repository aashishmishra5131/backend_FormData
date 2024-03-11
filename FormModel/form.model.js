import mongoose,{Schema} from "mongoose";

const formSchema=new Schema({
    FullName:{
        type:String,
    },
    Email:{
        type:String,
        unique: true,
    },
    Number:{
        type:String,
    },
    Age:{
        type:Number,
    },
    City:{
        type:String,
    },
    DOB:{
        type:String,
    }
},{timestamps:true});

export const Form=mongoose.model("Form",formSchema);