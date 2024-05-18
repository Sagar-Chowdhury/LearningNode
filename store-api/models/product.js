const {mongoose,SchemaTypes} = require("mongoose")

const productSchema = new mongoose.Schema(
    {
      price: {
        type:Number,
        required:[true,'Product Price Must Be Provided']
      },
      featured : {
        type:Boolean,
        default:false,
      },
      rating :{
        type:Number,
        default:4.5,
      },
      createdAt:{
        type:Date,
        default: Date.now()
      },
      company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not supported'
        }
      }

        
    },
    {
        timestapes : true
    }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product