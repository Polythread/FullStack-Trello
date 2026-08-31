import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Organization } from "./pages/organization";
export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/organization" element={<Organization />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
