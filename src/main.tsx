import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AdminAuthProvider } from "./lib/admin/auth";
import { AppointmentProvider } from "./lib/appointment";
import { CartProvider } from "./lib/cart";
import { ContentProvider } from "./lib/content/store";
import { router } from "./routes/router";
import "./styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ContentProvider>
      <AdminAuthProvider>
        <AppointmentProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AppointmentProvider>
      </AdminAuthProvider>
    </ContentProvider>
  </StrictMode>,
);
