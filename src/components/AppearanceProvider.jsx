import React, { useState } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { ConfigProvider, useAdaptivity, ViewWidth, platform as getPlatform } from "@vkontakte/vkui";

import { AppearanceContext, schemes } from "../hooks";

export function AppearanceProvider({ children }) {

    const { viewWidth } = useAdaptivity();

    const getStorageScheme = () => {
        const storageScheme = localStorage.getItem("scheme");

        return schemes.includes(storageScheme) ? storageScheme : "bright_light";
    };

    const [scheme, setScheme] = useState(getStorageScheme());
    const [platform, setPlatform] = useState(viewWidth === ViewWidth.DESKTOP ? "android" : getPlatform());

    const toggleScheme = () => {
        const newScheme = scheme === "bright_light" ? "space_gray" : "bright_light";

        setScheme(newScheme);

        localStorage.setItem("scheme", newScheme);
    };

    return (
        <AppearanceContext.Provider value={{
            scheme,
            platform,
            toggleScheme,
            setScheme,
            setPlatform
        }}>
            <ConfigProvider webviewType={"internal"}
                            isWebView={VKBridge.isWebView()}
                            scheme={scheme}
                            platform={platform}
            >
                {
                    children
                }
            </ConfigProvider>
        </AppearanceContext.Provider>
    );
}
