import Auth from "./components/Auth";
import { db, storage } from "./config/firebase";
import React from "react";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage"


function App() {
  const [movieList, setMovieList] = React.useState([])


  // new movie states
  const [newMovieTitle, setNewMovieTitle] = React.useState("")
  const [newReleaseDate, setNewReleaseDate] = React.useState(0)
  const [isNewMovieOscar, setisNewMovieOscar] = React.useState(false)


  // File upoload state
  const [fileUpload, setfileUpload] = React.useState(null)

  // upload file funct

  const uploadFile = async() => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    await uploadBytes(filesFolderRef, fileUpload)
  }

  const moviesCollectionRef = collection(db, "movies");

  const onSubmitMovie = async () => {
    try{
      await addDoc(
        moviesCollectionRef,
        {title: newMovieTitle,
         releaseDate: newReleaseDate,
         isNewMovieOscar: isNewMovieOscar,
        }
        )
        getMovieList();
    }catch(err){
      console.err(err)
    }
  }

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  const getMovieList = async () => {
    try{
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      id:doc.id,
      }))
      console.log(filteredData)
      setMovieList(filteredData)
    }catch(err){
      console.log(err);
    }
   
  }

  React.useEffect (() => {
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <h1>hiiiiiii biaaatch</h1>

      <div>
      <input 
      placeholder="Movie title..." 
      onChange={(e) => setNewMovieTitle(e.target.value)} 
      />
      
      <input 
      placeholder="Release Date" type="number" 
      onChange={(e) => setNewReleaseDate(e.target.value)}
      />
      
      <input  
      type="checkbox" 
      checkbox={isNewMovieOscar} 
      onChange={(e) => setisNewMovieOscar(e.target.checked)} 
      />
      
      <label>Oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedOscar ? "green" : "red"}}> 
            {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}> Delete Movie </button>
          </div>
        ))}
      </div>

          <div>
            <input 
            type="file" 
            onChange={(e) => setfileUpload(e.target.files[0])}
            />
            <button onClick={uploadFile}>Upload fckin file</button>
          </div>

    </div>
  );
}

export default App;
