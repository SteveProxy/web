import React from "react";
import { SplitCol, SplitLayout, View, Root, ViewWidth, useAdaptivity } from "@vkontakte/vkui";
import { useStructure, useSwipeBack } from "@unexp/router";

import { Connection, Error } from "./panels";

const connections = ["vk", "spotify"];
const panels = [];

export function Layout() {

    const path = window.location.pathname.replaceAll("/", "");

    const { viewWidth } = useAdaptivity();
    const { popout, view, panel } = useStructure({
        view: "home",
        panel: connections.includes(path) ?
            "connection" :
            panels.includes(path) ?
                path
                :
                "404"
    });

    const isDesktop = viewWidth > ViewWidth.MOBILE;
    const width = isDesktop ? "560px" : "100%";

    return (
        <SplitLayout style={{ justifyContent: "center" }}>
            <SplitCol animate={!isDesktop}
                      spaced={isDesktop}
                      width={width}
                      maxWidth={width}
            >
                <Root modal={null}
                      activeView={view}
                      popout={popout}
                >
                    <View id="home"
                          activePanel={panel}
                          {...useSwipeBack()}
                    >
                        <Connection id="connection"/>
                        <Error id="404"/>
                    </View>
                </Root>
            </SplitCol>
        </SplitLayout>
    );
}
