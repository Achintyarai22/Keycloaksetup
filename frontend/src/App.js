import logo from './logo.svg';
import './App.css';
import Home from './Pages/HomePage/Home';
import About from './Pages/AboutPage/About';
import Contact from './Pages/ContactPage/Contact';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRoutes from './Config/AllRoutes';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {AllRoutes.pages.map((route, index) => {
            const Page = route.page;
            return (
              <Route 
                key={index} 
                path={route.path} 
                element={
                  route.private 
                    ? <PrivateRoute><Page /></PrivateRoute>
                    : <Page />
                } 
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
