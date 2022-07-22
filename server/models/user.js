import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    mobile:{type: Number, required: true},
    address:{type: String, required: true},
    securityAns:{type:String, required: true}
})

export default mongoose.model("User", userSchema)