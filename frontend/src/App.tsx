import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { navLinks, navLogin, login } from "./assets/navLinks.tsx";
import { Error, Root, AuthRoute, AuthUser } from "./components/index.ts";

export default function App() {
    const mainRoutes = navLinks.map((link: { to: string; element: any; }) => ({
        path: link.to,
        index: link.to === "/",
        element: <AuthRoute>{link.element}</AuthRoute>,
    }));

    const loginRoutes = navLogin.map((link: { to: string; element: any; }) => ({
        path: link.to,
        element: <AuthRoute>{link.element}</AuthRoute>,
    }));
    const signin = login.map((link: { to: string; element: any; }) => ({
        path: link.to,
        element: <AuthUser>{link.element}</AuthUser>,
    }));

    const rootRoute = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <Error />,
            children: [...mainRoutes, ...loginRoutes, ...signin],
        },
    ]);

    return (
        <RouterProvider router={rootRoute} future={{ v7_startTransition: true }} />
    );
}
