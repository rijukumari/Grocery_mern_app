import Address from "../models/address.model.js";

export const addAddress = async(req,res) => {
    try{
        const userId = req.user;
        const {address} = req.body;

        await Address.create({
            ...address,
            userId
        })
        res.status(201).json({
            message: " Address added successfull",
            success: true
        })

    } catch(error){
        console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
    }
}

// get address

export const getAddress = async(req,res)=>{
    try{
        const userId = req.user;
        const address = await Address.find({userId}).sort({createAt: -1});
        res.status(200).json({success:true,address})

    }catch(error){
         console.log(" Error placing order: ", error);
    res.status(500).json({ message: " Internal server error" });
    }
}