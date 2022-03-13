import axios from 'axios';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Container/Login"
import ShoppingPage from "./Container/ShopingPage"

const App = () => {
  axios.defaults.baseURL = "http://31.42.189.4:16333/webcabinet/hs/webcab/";
  axios.defaults.auth = {
    username: "mobil",
    password: "123",
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/shopping_page" element={<ShoppingPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
