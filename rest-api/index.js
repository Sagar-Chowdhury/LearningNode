const express = require("express");
const { mongoose, SchemaTypes } = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/node-01")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err));

const personSchema = new mongoose.Schema(
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

const person = mongoose.model("Person", personSchema);

app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

app.get("/users", async (req, res) => {
  const allDbUsers = await person.find({});
  const html = `
    <table>
    <tr>
    <th>User Name</th>
    </tr>
     <tr>
      ${allDbUsers.map((user) => `<td>${user.first_name}</td>`)}
     </tr>
    </table>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await person.find({});
  res.json(allDbUsers);
});

app.route("/api/users/:id").get(async (req, res) => {
  const id = req.params.id;
    const allDbUsers = await person.find({});

    for (const user of allDbUsers) { // Use a 'for...of' loop
        if (user.id == id) {
            return res.json(user); // Exit the loop immediately upon match
        }
    }

    res.status(404).send("No such user found"); // Send error if no match
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  )
    return res.status(400).json({ response: "invalid request" });

  const result = await person.create({
    id: body.id,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  return res.status(201).json({ response: "user created" });
});

app.listen(PORT, () => console.log(`Server Listening on PORT:${PORT}`));
