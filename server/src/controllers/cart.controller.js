 import User from "../models/User.models.js";

 export const updatedCart = async(req,res)=>{
    try{
        const userId = req.user;
        const {cartItems} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartItems},
            {new: true}
        );
        if(!updatedUser){
            return res.status(404).json({
                message: "User not found", success: false
            })
        }
        res.status(200).json({updatedUser, success:true, message:"Cart updated successfully"})

    }catch(error){
        res.status(500).json({message:"Server error", error: error.message})
    }
 }