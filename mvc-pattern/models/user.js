const { mongoose, SchemaTypes } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.SchemaTypes.String, // Store 'id' as String
      required: true,
    },
    first_name: {
      type: SchemaTypes.String,
      required: true,
    },
    last_name: {
      type: SchemaTypes.String,
      required: true,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      validate: {
        validator: (email) => {
          // A basic email regular expression check
          const re = /\S+@\S+\.\S+/;
          return re.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    gender: {
      type: SchemaTypes.String,
      required: true,
      enum: ["Male", "Female", "Other"], // Restrict to specific values
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
