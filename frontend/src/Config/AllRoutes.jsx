
import Home from '../Pages/HomePage/Home';
import About from '../Pages/AboutPage/About';
import Contact from '../Pages/ContactPage/Contact';
import Todo from '../Pages/Todo/Todo';

const AllRoutes = {
  pages: [
    { path: "/", page: Home, private: false },
    { path: "/about", page: About, private: true },   // Protected
    { path: "/contact", page: Contact, private: true } // Protected
  ]
};


export default AllRoutes