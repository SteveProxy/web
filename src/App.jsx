import React from "react";
import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";

import { AppearanceProvider } from "./components";

import { Layout } from "./Layout";

import "./App.css";

export function App() {
    return (
        <AdaptivityProvider>
            <AppearanceProvider>
                <AppRoot>
                    <Layout/>
                </AppRoot>
            </AppearanceProvider>
        </AdaptivityProvider>
    );
}
