import React from "react";
import { Routes, Route } from "react-router-dom";
import Invoice from "../../invoice";
import UserDetail from "../../user/pages/user-detail";

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="users/:id" element={<UserDetail />} />
      <Route path="invoices" element={<Invoice />} />
    </Routes>
  )
}

export default Router;