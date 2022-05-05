import { Routes, Route } from "react-router-dom";
import Invoice from "../../invoice/pages/invoices.page";
import UserDetail from "../../user/pages/user-detail.page";
import Registration from "../../registration/pages/registration.page";

const Router = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="registration" element={<Registration />} />
      <Route path="users/:id" element={<UserDetail />} />
      <Route path="invoices" element={<Invoice />} />
    </Routes>
  )
}

export default Router;