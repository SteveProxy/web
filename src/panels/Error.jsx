import React from "react";
import { Avatar, Card, Div, Panel, Title } from "@vkontakte/vkui";

import Steve from "../assets/Steve.png";

export function Error({ id }) {

    return (
        <Panel id={id}>
            <div style={{ marginTop: 50 }}>
                <Div>
                    <Card>
                        <div className="Connection">
                            <div className="Connection-Avatars">
                                <Avatar size={80}
                                        src={Steve}
                                        shadow={false}
                                />
                            </div>
                            <Title level="1"
                                   weight="semibold"
                                   style={{ marginBottom: 16 }}
                            >
                                Страница не найдена
                            </Title>
                            <Title level="3"
                                   weight="regular"
                            >
                                Проверьте указанный путь и попробуйте снова.
                            </Title>
                        </div>
                    </Card>
                </Div>
            </div>
        </Panel>
    );
}
