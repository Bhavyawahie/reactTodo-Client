import React, { useEffect ,useState} from "react"
import axios from "axios"
import Header from "./Header"
import CreateArea from "./CreateArea"
import Note from "./Note"
import Footer from "./Footer"


const App = () => {
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
        const getNotefromServer = async () => {
            const res = await axios.get("https://keeperbackendserver.herokuapp.com/notes");
            setNotes(res.data);
            console.log(res.data);
        }
        getNotefromServer();
    }, [])
    //Takes a note from the createarea component and pushes it into the DB while maintaining its state
    const noteInit = async (note) => {
        await axios.post(`https://keeperbackendserver.herokuapp.com/notes/${note.id}`, note)
        setNotes(prevVal => {
            return [...prevVal, note]
        });
    }

    const noteDel = async (id) => {
        await axios.delete(`https://keeperbackendserver.herokuapp.com/notes/${id}`)
        await setNotes(notes.filter(note => {
            return note.id !== id
        }));
    }

    return <div>
        <Header/>
        <CreateArea onSubmit={noteInit}/>
        {
            notes.map((note, index) => {
            return( 
                <Note
                    key={note.id}
                    id={note.id} 
                    title={note.title} 
                    content={note.content}
                    onDelClick={noteDel}
                /> 
                )
            })
        }
        <Footer/>
    </div>
}
export default App
