import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import Projects from "./components/Projects";
import About from "./components/About";
import NotFound from "./components/NotFound";
import ListAd from "./components/ad/ListAd";
import Signin from "./components/auth/Signin";

import AddAd from "./components/ad/AddAd";
import EditAd from "./components/ad/EditAd";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/js/all.min.js"

import PrivateRoute from "./components/auth/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="ad/list" element={<ListAd />} />
          <Route path="ad/add" element={
            <PrivateRoute>
              <AddAd />
            </PrivateRoute>} />
          <Route path="ad/edit/:id" element={
            <PrivateRoute>
              <EditAd />
            </PrivateRoute>} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
          <Route path="users/signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
