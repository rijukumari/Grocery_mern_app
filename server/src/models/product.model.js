import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    name:{
        type:String,
        require:true
    },
    description:{
        type: Array,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    offerPrice:{
        type:String,
        required:true
    },
    image:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    inStock:{
        type:Boolean,
        default:true,
        required:true
    }

})
const Product = mongoose.model("Product",productSchema);

export default Product;