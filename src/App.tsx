import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Index from '@/pages/Index';
import Admin from '@/pages/Admin';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}
