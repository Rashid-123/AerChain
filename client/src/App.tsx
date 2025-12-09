import {Routes , Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {

  return (
    
     <div className="bg-bg1 min-h-screen text-white">
      <Navbar />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>

     </div>
    
  )
}

export default App
