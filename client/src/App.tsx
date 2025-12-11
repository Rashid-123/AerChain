import {Routes , Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ListPage from "./pages/List";
function App() {

  return (
    
     <div className="min-h-screen bg-bg1 ">
      <Navbar />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ListPage />} />
      </Routes>

     </div>
    
  )
}

export default App
