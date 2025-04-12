import React from "react";
import Home from "./components/home/Home";
import Shop from "./components/shop/Shop";
import { Route, Routes, useSearchParams } from "react-router-dom";
import DessertDetail from "./components/dessert/DessertDetail";
import CreateDessert from "./components/admin/CreateDessert";
import CustomOrderForm from "./components/forms/custom-order/CustomOrderForm";
import AccountDashboard from "./components/account/AccountDashboard";
import ViewDesserts from "./components/admin/ViewDesserts";
import EditDessert from "./components/admin/EditDessert";
import NotFound from "./components/NotFound";
import { ProtectedUserRoute, ProtectedAdminRoute } from "./guards/AuthGuard";
import AdminDashboard from "./components/admin/AdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route
        path="/desserts/cakes/:dessertId/:dessertName"
        element={<DessertDetail />}
      />
      <Route path="/custom-order" element={<CustomOrderForm />} />
      <Route element={<ProtectedUserRoute />}>
        <Route path="/account" element={<AccountDashboard />} />
      </Route>
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/home" element={<AdminDashboard />} />
        <Route path="/admin/desserts" element={<ViewDesserts />} />
        <Route path="/admin/desserts/create" element={<CreateDessert />} />
        <Route
          path="/admin/desserts/edit-dessert/:dessertId"
          element={<EditDessert />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
