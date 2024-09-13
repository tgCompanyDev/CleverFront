import { SectionTabs } from "@/entities/section-tabs/ui/SectionTabs"
import {ReactComponent as Bot} from "@/shared/assets/icons/bot.svg"
import {ReactComponent as Channel} from "@/shared/assets/icons/channel.svg"
import {ReactComponent as Account} from "@/shared/assets/icons/account.svg"
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { BotControl } from "@/features/bot-control"
import { useEffect } from "react"
import { RoutePath } from "../routeConfig"
const items = [
    {
        title: "Боты",
        id: "bots",
        colors: "from-[#CDDFFF] to-[#7BAAFF]",
        icon: <Bot className="fill-black opacity-50 w-6" />
    },
    {
        title: "Каналы",
        id: "channels",
        colors: "from-[#FAFFF9] to-[#BFEFAE]",
        icon: <Channel className="fill-black opacity-50 w-6"/>,
    },
    {
        title: "Аккаунты",
        id: "accounts",
        colors: "from-[#FFFDE5] to-[#FFF695]",
        icon: <Account className="fill-black opacity-50 w-6"/>,
    },
    {
        title: "Рестораны",
        id: "restaurants",
        colors: "from-[#b0e4c8] to-[#4eb67e]",
        icon: <Bot className="fill-black opacity-50 w-6"/>,
    },
]

const ControlPanelPage = () => {
    const location = useLocation();
    const { pathname } = location
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === RoutePath.controlPanel) {
            navigate(RoutePath.controlPanelBots)
        }
    }, [pathname])
    return (
        <>
            <div className="container">
                <SectionTabs items={items} />
                <Routes>
                    <Route path={"bots"} element={<BotControl />} key={"bots"} />
                </Routes>
                <Outlet />
            </div>
        </>
    )
}

export default ControlPanelPage;