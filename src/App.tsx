import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import { ProLayout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <ProLayout>
        <div>
          <Routes>
            {routes.map((item: any) => (
              <Route path={item.path} element={<item.component />} />
            ))}
            <Route path="/Redirect" element={<Navigate to="/About" />} />
          </Routes>
        </div>
      </ProLayout>
    </BrowserRouter>
  );
}

export default App;
