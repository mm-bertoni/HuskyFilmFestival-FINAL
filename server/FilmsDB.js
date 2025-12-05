import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from "mongodb";
function filmsDB(){
    const me = {};
    const connectionURI = process.env.ATLAS_URI;
    //console.log("Connection: ", connectionURI);
    //const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = "HuskyFilmFestival";
    const COLLECTION_NAME = "filmSubmissions";

  const connect = () => {
    // Connect with client
    const client = new MongoClient(connectionURI);
    console.log("Connected to Client")
    const films = client.db(DB_NAME).collection(COLLECTION_NAME);
    console.log("Connected with Mongo DB");
    return { client, films };
  };

  // Get films to load
  me.getFilms = async (query  = {}) => {
    // Connect to db
    const {client, films} = connect();
    try {
      const data = await films.find(query).toArray(); 
      //console.log("Got data : ", data);
      return data; 
    } finally{
      await client.close();
    }
  };

  // Get count of All Films
  me.countFilms = async (query = {}) => {
    // Connect to db
    const {client, films} = connect();
    try {
      const total = await films.countDocuments(query); 
      return total;
    } finally{
      await client.close();
    }
  };

  // Add new Film
  me.addFilm = async (newDirector,newTitle, newGenre, newScreener ) => {
    const newEntry = {
      director: newDirector,
      title: newTitle,
      genre: newGenre,
      screener: newScreener,
      //status:null
    };
    // Connect
    const {client, films} = connect();
    try {
      const result = await films.insertOne(newEntry);
      return result; 
    } catch (error){
      console.error("Error adding new submission", error);
    } finally {
      await client.close();
    }

  } ; 

  // Delete Film - deletes one entry
  me.deleteFilm = async(deleteDirector, deleteTitle, deleteGenre, deleteScreener) => {
    // Connect
    const {client, films} = connect();
    // Try to delete 
    try {
      await films.deleteOne({
        title:deleteTitle,
        director:deleteDirector,
        genre:deleteGenre,
        screener:deleteScreener


      });
    } catch (error){
      console.error("Error deleting this film", error);
    } finally {
      await client.close();
    }
  };

  // Update Film Status
  me.updateStatus = async (updateDirector, updateTitle, updateGenre, updateScreener, updateStatus) =>{
    // Connect
    const {client, films} = connect();
    // Filter to the specified entry
    const filter = {
      director:updateDirector,
      title:updateTitle,
      genre: updateGenre,
      screener: updateScreener
    };

    const update = {
      $set: {
        status: updateStatus
      }
    };
    // Update that one entry
    try {
      await films.updateOne(filter, update);
      console.log("Film status was updated");
      //console.log("Updated Status: ", updateStatus);
    } catch (error){
      console.error("Error in updating the status", error);
    } finally {
      await client.close();
    }
    //Close
  };

  return me;
}

const myDB = filmsDB();
export default myDB; 
