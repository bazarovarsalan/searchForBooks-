import "./App.css";
import Header from "./components/header/Header";
import BooksList from "./components/mainContent/BooksList";
import { Routes, Route } from "react-router-dom";
import BookItemDetails from "./components/mainContent/BookItemDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/:id" element={<BookItemDetails />} />
      </Routes>
    </div>
  );
}

export default App;
