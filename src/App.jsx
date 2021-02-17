import React from "react";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import { Router } from "@unexp/router";

import { AppearanceProvider } from "./components";

import { Layout } from "./Layout";

import "./App.css";

export function App() {
    return (
        <Router>
            <AdaptivityProvider>
                <AppearanceProvider>
                    <AppRoot>
                        <Layout/>
                    </AppRoot>
                </AppearanceProvider>
            </AdaptivityProvider>
        </Router>
    );
}
