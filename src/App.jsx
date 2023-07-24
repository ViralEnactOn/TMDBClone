import MovieList from "./components/movieList/movieList";
import Login from "./components/login/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Protected Route/proctectedRoute";
import MovieDetail from "./components/movieDetail/movieDetail";
import TestFunction from "./components/testFunction/testFunction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/movie" element={<MovieList />} />
          <Route path="/:id" element={<MovieDetail />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/function" element={<TestFunction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
