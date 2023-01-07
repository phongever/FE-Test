import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app container">
      <header class="row">
        <div class="row justify-content-between">
          <div class="col-4">My Blog</div>
          <div class="col-4">
            <Link to="/">Home</Link>
            <Link to="/create">
              <button type="button" class="btn btn-primary">
                New post
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
