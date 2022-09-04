import React from "react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from "./components/Footer"
import registerScreen from "./screens/registerScreen"
import loginScreen from "./screens/loginScreen"
import notesScreen from "./screens/notesScreen"
import notFound from "./components/NotFound"


const App = () => {
    return (
        <Router>
            <main>
                <Switch>
                    <Route path="/note" exact component={notesScreen} />
                    <Route path="/" exact component={loginScreen} />
                    <Route path="/register" exact component={registerScreen} />
                    <Route component={notFound}/>
                </Switch>
            </main>
            <Footer/>
        </Router>
    )
}
export default App


// const [notes, setNotes] = useState([])
    
//     useEffect(() => {
//         const getNotefromServer = async () => {
//             const res = await axios.get("/api/notes");
//             setNotes(res.data);
//             //console.log(res.data);
//         }
//         getNotefromServer();
//     }, [])
//     //Takes a note from the createarea component and pushes it into the DB while maintaining its state
//     const noteInit = async (note) => {
//         const res = await axios.post(`/api/notes`, note)
//         setNotes(prevVal => {
//             return [...prevVal, note]
//         });
//     }

//     const noteDel = async (id) => {
//         const res = await axios.delete(`/api/notes/${id}`)
//         await setNotes(notes.filter(note => {
//             return note.id !== id
//         }));
//     }

//     return <div>
//         <Header/>
//         <CreateArea onSubmit={noteInit}/>
//         {
//             notes.map((note) => {
//             return( 
//                 <Note
//                     key={note.id}
//                     id={note.id} 
//                     title={note.title} 
//                     content={note.content}
//                     onDelClick={noteDel}
//                 /> 
//                 )
//             })
//         }
//         <Footer/>
//     </div>