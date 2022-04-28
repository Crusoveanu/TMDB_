import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../entities/enums'
import { Menu } from 'antd'
import LoginMenu from '../api-authorization/LoginMenu'
import Swal from 'sweetalert2'
import './header.css'

const { SubMenu } = Menu;

const Header = () => {
	const navigate = useNavigate()
	const [currentMenu, setCurrentMenu] = useState('')
	const handleMenuClick = (e: any) => {
		setCurrentMenu(e.key)
    }
    const handleInfoClickMenu = () => {
        Swal.fire({
            title: 'Neimplementat',
            icon: 'info'
        });
    }

    return (
        <div className="topHeader">
            <img className="header__logo"
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
                onClick={() => navigate(ERoutes.HOME)}
            />
            <Menu onClick={handleMenuClick} selectedKeys={[currentMenu]} className="SubMenu p__header" mode="horizontal">
                <SubMenu key="movies" title="Filme">
                    <Menu.Item key="m1" onClick={() => navigate(`${ERoutes.POPULARMOVIES}`)}>Populare</Menu.Item>
                    <Menu.Item key="m2" onClick={handleInfoClickMenu}>Difuzate azi</Menu.Item>
                    <Menu.Item key="m3" onClick={handleInfoClickMenu}>Urmeaza sa apara</Menu.Item>
                    <Menu.Item key="m4" onClick={() => navigate(`${ERoutes.TOPRATEDMOVIES}`)}>Cele mai multe evaluari</Menu.Item>
                </SubMenu>
                <SubMenu key="shows" title="Seriale">
                    <Menu.Item key="s1" onClick={handleInfoClickMenu}>Populare</Menu.Item>
                    <Menu.Item key="s2" onClick={handleInfoClickMenu}>Difuzate azi</Menu.Item>
                    <Menu.Item key="s3" onClick={handleInfoClickMenu}>La TV</Menu.Item>
                    <Menu.Item key="s4" onClick={handleInfoClickMenu}>Cele mai multe evaluari</Menu.Item>
                </SubMenu>
                <SubMenu key="people" title="Persoane">
                    <Menu.Item key="p1" onClick={handleInfoClickMenu}>Persoane populare</Menu.Item>
                </SubMenu>
                <SubMenu key="more" title="Mai multe">
                    <Menu.Item key="d1" onClick={handleInfoClickMenu}>Discutii</Menu.Item>
                    <Menu.Item key="d2" onClick={handleInfoClickMenu}>Clasament</Menu.Item>
                    <Menu.Item key="d3" onClick={handleInfoClickMenu}>Suport</Menu.Item>
                    <Menu.Item key="d4" onClick={handleInfoClickMenu}>API</Menu.Item>
                </SubMenu>
            </Menu>
            <div className="primaryNav">
                <LoginMenu />
            </div>
        </div>
    )
}

export default Header
