import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Hello world</div>} />
      </Routes>
    </BrowserRouter>
  );
};
