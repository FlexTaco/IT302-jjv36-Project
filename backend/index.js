//joffre villacis
//oct 6, 2024
//it302, section 451
//phase 2
//jjv36@njit.edu
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import JobsDAO from "./dao/jobsDAO.js";

async function main() {
  dotenv.config();
  const client = new mongodb.MongoClient(process.env.JOBS_DB_URI);

  const port = process.env.PORT || 8000;
  try {
    await client.connect();
    await JobsDAO.injectDB(client);

    app.listen(port, () => {
      console.log("server is running on port:" + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
