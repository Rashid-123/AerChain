import {Routes , Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import KanbanPage from "./pages/Home";
import ListPage from "./pages/List";
function App() {

  return (
    
     <div className=" min-h-[1000px] bg-bg1">
      <Navbar />
     
      <Routes >
        <Route path="/" element={<KanbanPage />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>

     </div>
    
  )
}

export default App
