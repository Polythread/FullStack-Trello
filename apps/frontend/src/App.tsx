import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import { Organization } from "./pages/organization";
import { Board } from "./pages/board";
import { Dashboard } from "./pages/dashboard";
export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/organization/:orgId" element={<Organization />} />
          <Route path="/board/:boardId" element={<Board />} />
          <Route path="/organization" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
