import { BrowserRouter as Redirect, Routes, Route } from "react-router-dom";
import "./App.css" ;
import HomeScreen from "./pages/home";


function App() {
  return (
    <>         
          <Routes>
          <Route path="/" element={<HomeScreen />}/>            
          </Routes>         
    </>
  );
}

export default App;
