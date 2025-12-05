import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";
function usersDB(){
    const me = {};
    const connectionURI = process.env.ATLAS_URI;
    //console.log("Connection: ", connectionURI);
    //const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = "userDatabase";
    const COLLECTION_NAME = "users";

  const connect = () => {
    // Connect with client
    const client = new MongoClient(connectionURI);
    console.log("Connected to Client")
    const films = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log("Connected with Mongo DB");
    return { client, films };
  };

  // Get films to load
  me.getUser = async (query) => {
    // Connect to db
    const {client, usersDB} = connect();
    try {
      const data = await usersDB.find(query).toArray(); 
      //console.log("Got data : ", data);
      return data; 
    } finally{
      await client.close();
    }
  };



  // Add new Film
  me.addUser = async (newUsername, newPasswordHash) => {
    const newEntry = {
      username: newUsername,
      passwordHash: newPasswordHash,
    };
    // Connect
    const {client, usersDB} = connect();
    try {
      const result = await usersDB.insertOne(newEntry);
      return result; 
    } catch (error){
      console.error("Error adding new submission", error);
    } finally {
      await client.close();
    }

};

  


  return me;

}

const myDB = usersDB();
export default myDB; 
