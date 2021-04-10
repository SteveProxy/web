import axios from "axios";
import React, { useEffect } from "react";
import { Card, Div, Panel } from "@vkontakte/vkui";

import { ConnectionCard } from "../components";

import SpotifyLogo from "../assets/Spotify.png";
import VKLogo from "../assets/VK.png";

const services = new Map([
    ["spotify", ["Spotify", SpotifyLogo]],
    ["vk", ["ВКонтакте", VKLogo]]
]);
export function Connection({ id }) {

    const connection = window.location.pathname.replaceAll("/", "");
    const [title, logo] = services.get(connection);

    const params = new URLSearchParams(window.location.search || window.location.hash);

    const state = params.get("state");
    const command = `.${connection} auth ${state ?? ""}`;

    useEffect(() => {
        switch (connection) {
            case "vk": {
                const token = params.get("access_token");

                if (token) {
                    axios.post(`${process.env.HOMEPAGE}/vk`, `token=${token}&state=${state}`);
                }

                break;
            }
        }
    }, []);

    return (
        <Panel id={id}>
            <div style={{ margin: "50 0" }}>
                <Div>
                    <Card>
                        <ConnectionCard logo={logo}
                                        title={title}
                                        command={state && command}
                        />
                    </Card>
                </Div>
            </div>
        </Panel>
    );
}
