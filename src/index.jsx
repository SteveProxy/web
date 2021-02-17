import "core-js";

import React from "react";
import ReactDOM from "react-dom";
import { platform, IOS } from "@vkontakte/vkui";
import mVKMiniAppsScrollHelper from "@vkontakte/mvk-mini-apps-scroll-helper";

import { App } from "./App";

import "@vkontakte/vkui/dist/vkui.css";

const Os = platform();
const root = document.getElementById("root");

if (Os === IOS) {
    mVKMiniAppsScrollHelper(root);
}

ReactDOM.render(<App/>, root);
