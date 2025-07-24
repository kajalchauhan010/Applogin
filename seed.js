const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();

async function seedUsers() {
    await mongoose.connect("mongodb+srv://kajalchauhan8365:kajal@cluster0.n7vjp.mongodb.net/roleAuthDB?retryWrites=true&w=majority&appName=Cluster0");
    await User.deleteMany();

    await User.create([
        { name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
        { name: "QA User", email: "qa@example.com", password: "qa123", role: "qa" },
        { name: "Client User", email: "client@example.com", password: "client123", role: "client" }
    ]);

    



    console.log("Seeding done");
//     // mongoose.connection.close();
}

seedUsers();

