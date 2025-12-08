
import { MongoClient } from "mongodb";
function usersDB(){
    const me = {};
    const connectionURI = process.env.ATLAS_URI;
    // ADD THESE DEBUG LOGS
    console.log("ATLAS_URI exists:", !!connectionURI);
    console.log("ATLAS_URI starts with:", connectionURI?.substring(0, 20));
    console.log("Connection: ", connectionURI);
    //const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = "userDatabase";
    const COLLECTION_NAME = "users";

  const connect = async() => {
    // Connect with client
    //const client = new MongoClient(MONGODB_URI);
    const client = new MongoClient(connectionURI);
    await client.connect();
    console.log("Connected to Client")
    const usersDB = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log("Connected with Mongo DB");
    return { client, usersDB };
  };

  // Get user to load
  me.getUser = async (query) => {
    // Connect to db
    const {client, usersDB} = await connect();
    try {
      const data = await usersDB.find(query).toArray(); 
      //console.log("Got data : ", data);
      return data; 
    } finally{
      await client.close();
    }
  };



  // Add new User
  me.addUser = async (newUsername, newPasswordHash) => {
    const newEntry = {
      username: newUsername,
      passwordHash: newPasswordHash,
    };
    // Connect
    const {client, usersDB} = await connect();
    try {
      const result = await usersDB.insertOne(newEntry);
      return result; 
    } catch (error){
      console.error("Error adding new submission", error);
      throw error;
    } finally {
      await client.close();
    }

};

  


  return me;

}

const myDB = usersDB();
export default myDB; 
