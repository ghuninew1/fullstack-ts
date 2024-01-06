import { Outlet } from "react-router-dom";
import {Navbar, SideBar, Footer,Loading} from "#components"
import { Auth } from "#contexts/AuthProvider";
import { Suspense } from "react";

export default function RouteRoot() {
    const { isUser } = Auth();
    const showSidebar: boolean = Boolean(isUser?.username);

    return (
        <main className="bg-background font-main min-h-mainMin w-screen overflow-hidden text-slate-900 dark:text-slate-200">
            <Suspense fallback={<Loading />}>
                <Navbar userMenu={showSidebar} />
            </Suspense>
            {showSidebar && (
                    <Suspense fallback={<Loading />}>
                        <SideBar />
                    </Suspense>
            )}
            <div className="min-h-mainMin">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </main>
    );
}
