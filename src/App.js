import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Spinner } from "./components";
import "./style.css";

const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import("./pages/Create"));
const Detail = lazy(() => import("./pages/Detail"));
const Edit = lazy(() => import("./pages/Edit"));

function App() {
  return (
    <div className="app container py-3">
      <Router>
        <Navbar />
        <div className="mt-2">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/:id" element={<Detail />} />
              <Route path="/:id/edit" element={<Edit />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </div>
  );
}

export default App;
