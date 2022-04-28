import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../entities/enums';
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const LoginMenu = () => {
    const [isLogged, setIsLogged] = useState('');

    //LOGIN DB
    useEffect(() => {
        async function GetAuthentication() {
            const response = await fetch('user/User', {
                headers: { 'Content-Type': 'application-json' },
                credentials: 'include'
            })
            const data = await response.json();
            setIsLogged(data.userEmail);
        }
        GetAuthentication();
        sessionStorage.setItem('userId', isLogged);
    });

    const logout = async () => {
        const response = await fetch('user/LogOut', {
            method: 'POST',
            headers: { 'Content-Type': 'application-json' },
            credentials: 'include'
        })
        if (response.status == 200) {
            setIsLogged(null);
            sessionStorage.setItem('userId', null);
            window.location.reload();
        }
        else {
            alert("Logout esuat!");
        }
    }

    return (
        <>
            {(() => {
                if (!isLogged) {
                    return (<Fragment> <div />
                        <Menu mode="horizontal">
                            <SubMenu key="contul_meu" title="Contul meu" className="primaryNav" icon={<UserOutlined />}>
                                <Menu.Item >
                                    <Link to={`${ERoutes.LOGIN}`}>Intra in cont</Link>
                                </Menu.Item>
                                <Menu.Item >
                                    <Link to={`${ERoutes.REGISTER}`}>Cont nou</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Fragment>)
                } else {
                    return (<Fragment> <div />
                        <Menu mode="horizontal">
                            <SubMenu key="contul_meu" title={isLogged} className="primaryNav"
                                icon={<UserOutlined />}>
                                <Menu.Item >
                                    <Link to={`${ERoutes.HOME}`} onClick={logout}>Logout</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Fragment>);
                }
            })()}
        </>
    )
}
export default LoginMenu