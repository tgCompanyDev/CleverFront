import { formatTelegramLink } from "@/shared/libs/helpers";
import { CustomButton } from "@/shared/ui/CustomButton";
import { SettingOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import { Link } from "react-router-dom";

interface DataType {
    id: string;
    name: string;
    channels: string[];
    link: string;
}

const botList: DataType[] = [
    {
        id: "1",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    },
    {
        id: "2",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    },
    {
        id: "3",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    },
    {
        id: "4",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    },
    {
        id: "5",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    },
    {
        id: "6",
        name: "Bot",
        link: "https://t.me/DuckTask_bot",
        channels: [
            "https://t.me/kontext_channel",
            "https://t.me/kinopoisk",
        ]
    }
]



const columns: TableColumnsType<DataType> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ссылка',
        dataIndex: 'link',
        key: 'link',
        render: (_, record) => <Link to={record.link} target="_blank">{formatTelegramLink(record.link)}</Link>
    },
    {
        title: 'Подключенные каналы',
        dataIndex: 'channels',
        key: 'channels',
        render: (_, record) => <ul className="flex gap-1 flex-wrap">{record.channels.map((link, index) => <li key={index}><Link to={record.link} target="_blank">{formatTelegramLink(link)}</Link></li>)}</ul>
    },
    {
        title: 'Настройки',
        dataIndex: 'settings',
        key: 'settings',
        width: 100,
        render: (_, { id }) => <div className="flex justify-center"><SettingOutlined className="cursor-pointer p-1" onClick={() => console.log(id)} /></div>,
    },
];

export const BotList = () => {
    const dataSource = botList.map(bot => ({ ...bot, key: bot.id }))
    return (
        <div>
            <div className="flex justify-end mb-4">
                <CustomButton type="primary">Добавить</CustomButton>
            </div>
            <Table columns={columns} pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }} dataSource={dataSource} />
        </div>
    )
}