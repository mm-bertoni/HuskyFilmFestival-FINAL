import { MongoClient } from "mongodb";
function filmsDB(){
    const me = {};
    //const URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
    const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = "HuskyFilmFest";
    const COLLECTION_NAME = "filmSubmissions";

  const connect = () => {
    // Connect with client
    const client = new MongoClient(MONGODB_URI);
    const films = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log("Connected with Mongo");
    return { client, films };
  };

  // Get films to load

  // Get count of All Films

  // Get count of Short Films (NICE TO HAVE)

  // Get count of Feature Films (NICE TO HAVE)

  // Add new Film

  // Delete Film by ID

  // Update Film Status by ID
}

const filmsDB = FilmsDB();
export default filmsDB; 
