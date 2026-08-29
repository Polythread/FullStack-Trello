import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
