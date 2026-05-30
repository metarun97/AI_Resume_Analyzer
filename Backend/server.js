/* Import elements */
import dotenv from "dotenv";
import app from './src/app.js';
import dns from "dns";
import connectToDb from "./src/db/db.js";

/* Configure dotenv file */
dotenv.config();

/* Set DNS for server */
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/* connect function called */
connectToDb();

/* Server started */
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000")
})

