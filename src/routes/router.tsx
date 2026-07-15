import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  useRouterState,
} from "@tanstack/react-router";
import { AppointmentModal } from "../components/AppointmentModal";
import { CartDrawer } from "../components/CartDrawer";
import { CartToast } from "../components/CartToast";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MalikAssistant } from "../components/MalikAssistant";
import { ErrorState, NotFoundPage } from "../components/RouteStates";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { useCart } from "../lib/cart";

function RootLayout(): JSX.Element {
  const { isCartOpen, openCart, closeCart } = useCart();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  // Admin area uses its own layout (no public header/footer/cart/WhatsApp chrome).
  if (pathname.startsWith("/admin")) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header onCartOpen={openCart} />
      <Outlet />
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <WhatsAppButton />
      <MalikAssistant />
      <CartToast />
      <AppointmentModal />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/HomePage"), "HomePage"),
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: lazyRouteComponent(() => import("../pages/ShopPage"), "ShopPage"),
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productSlug",
  component: lazyRouteComponent(() => import("../pages/ProductPage"), "ProductPage"),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: lazyRouteComponent(() => import("../pages/ServicesPage"), "ServicesPage"),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: lazyRouteComponent(() => import("../pages/AboutPage"), "AboutPage"),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: lazyRouteComponent(() => import("../pages/ContactPage"), "ContactPage"),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: lazyRouteComponent(() => import("../pages/admin/AdminLoginPage"), "AdminLoginPage"),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: lazyRouteComponent(() => import("../pages/admin/AdminLayout"), "AdminLayout"),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/admin/AdminDashboardPage"), "AdminDashboardPage"),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "products",
  component: lazyRouteComponent(() => import("../pages/admin/AdminProductsPage"), "AdminProductsPage"),
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "services",
  component: lazyRouteComponent(() => import("../pages/admin/AdminServicesPage"), "AdminServicesPage"),
});

const adminHomepageRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "homepage",
  component: lazyRouteComponent(() => import("../pages/admin/AdminHomepagePage"), "AdminHomepagePage"),
});

const adminTestimonialsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "testimonials",
  component: lazyRouteComponent(() => import("../pages/admin/AdminTestimonialsPage"), "AdminTestimonialsPage"),
});

const adminBrandsRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "brands",
  component: lazyRouteComponent(() => import("../pages/admin/AdminBrandsPage"), "AdminBrandsPage"),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  shopRoute,
  productRoute,
  aboutRoute,
  contactRoute,
  adminLoginRoute,
  adminRoute.addChildren([
    adminIndexRoute,
    adminProductsRoute,
    adminServicesRoute,
    adminHomepageRoute,
    adminTestimonialsRoute,
    adminBrandsRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFoundPage,
  defaultErrorComponent: ErrorState,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
