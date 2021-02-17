import React, { useState } from "react";
import { Avatar, Button, Input, Title } from "@vkontakte/vkui";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Steve from "../assets/Steve.png";

import "./ConnectionCard.css";

export function ConnectionCard({ logo, title, command }) {

    const [copyable, setCopyable] = useState(true);

    return (
        <div className="Connection">
            <div className="Connection-Avatars">
                <Avatar size={80}
                        src={logo}
                        shadow={false}
                />
                <div className="Connection-Ellipses">
                    <div className="Connection-Ellipse"/>
                    <div className="Connection-Ellipse"/>
                    <div className="Connection-Ellipse"/>
                </div>
                <Avatar size={80}
                        src={Steve}
                        shadow={false}
                />
            </div>
            <Title level="1"
                   weight="semibold"
                   style={{ marginBottom: 16 }}
            >
                {
                    title
                }
            </Title>
            <Title level="3"
                   weight="regular"
                   style={{ marginBottom: 48 }}
            >
                Используйте эту команду в чате, чтобы авторизоваться в плагине.
            </Title>
            <Input value={command}
                   style={{ marginBottom: 16 }}
            />
            <CopyToClipboard text={command}>
                <Button size="l"
                        stretched
                        disabled={!copyable}
                        onClick={() => setCopyable(false)}
                >
                    {
                        copyable ?
                            "Скопировать команду"
                            :
                            "Команда скопирована"
                    }
                </Button>
            </CopyToClipboard>
        </div>
    );
}
