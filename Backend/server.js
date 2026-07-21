/* Load environment variables first */
import 'dotenv/config';
import imagekit from "./src/config/imagekit.js";
import app from './src/app.js';
import dns from "dns";
import connectToDb from "./src/db/db.js";


/* Set DNS for server */
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/* connect function called */
connectToDb();

/* Server started */
app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000")
})

