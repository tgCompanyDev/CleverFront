import { RoutePath } from "@/pages/routeConfig";
import { AppstoreOutlined, BarChartOutlined, PlusCircleOutlined, UserOutlined, HomeOutlined, SettingOutlined, RiseOutlined, TeamOutlined, RobotOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { Key, ReactNode, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LinkItem } from "./LinkItem";
import { classNames } from "@/shared/libs/helpers";

type MenuItem = Required<MenuProps>['items'][number] & { href: string, children?: MenuItem[] };

const defaultSelectedKey = '1'

const mainLinks = [
    {
        href: RoutePath.manage,
        title: "Панель управления",
        icon: <SettingOutlined />
    },
    {
        href: RoutePath.promote,
        title: "Продвижение",
        icon: <RiseOutlined />
    },
    {
        href: RoutePath.clients,
        title: "Клиенты",
        icon: <TeamOutlined />
    },
    {
        href: RoutePath.analytic,
        title: "Аналитика",
        icon: <BarChartOutlined />
    },
    {
        href: RoutePath.constructor,
        title: "Конструктор",
        icon: <RobotOutlined />
    },
]

export const SideBarMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    const [selectedKey, setSelectedKey] = useState<string[]>([defaultSelectedKey])


    const getItem = (
        label: ReactNode,
        key: Key,
        href?: string,
        icon?: ReactNode,
        children?: MenuItem[],
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            href,
            onClick: () => {
                if (!children && href) {
                    navigate(href);
                    setSelectedKey([key.toString()]);
                }
            }
        } as MenuItem;
    }

    const items: MenuItem[] = [
        getItem('Home', '1', '/', <HomeOutlined />),
        getItem('Create new DApp', '2', '/create', <PlusCircleOutlined />),
        getItem('DApps', '3', `/dapps/`, <AppstoreOutlined />),
        getItem('All DApps', '4', `/dapps`, <AppstoreOutlined />),
        getItem('Profile', '5', '/profile', <UserOutlined />),
        getItem('Public', '6', '/public', <BarChartOutlined />, [getItem('Tokensale', '60', '/public'), getItem('Staking', '71', '/public')]),
    ];

    useEffect(() => {
        items.forEach(item => {
            const itemKey = item?.children && item?.children.find(children => children.href === pathname)?.key
            if (itemKey) {
                setSelectedKey([itemKey.toString()])
            } else {
                item.key && item.href === pathname && setSelectedKey([item.key.toString()]);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    return (
        <aside
            ref={null}
            className={classNames(
                "absolute left-0 top-0 z-9999 h-screen lg:static lg:translate-x-0",
                true ? 'translate-x-0' : '-translate-x-full',
                "flex flex-col overflow-y-hidden",
                "duration-300 ease-linear",
                "bg-white shadow-[5px_0px_6px_-3px_rgba(34,80,58,0.3)]"
            )}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6.5">
                <NavLink to="/" className="font-bold text-xl">
                    BOTAMBA
                </NavLink>

            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6 bg-white">
                    <Menu
                        theme="light"
                        mode="inline"
                        items={items}
                        selectedKeys={selectedKey}
                        style={{backgroundColor: "white"}}
                    />
                </nav>
            </div>
        </aside>

    )
}


{/* <nav>
    <Menu
        theme="dark"
        mode="inline"
        items={items}
        selectedKeys={selectedKey}
    />
</nav> */}