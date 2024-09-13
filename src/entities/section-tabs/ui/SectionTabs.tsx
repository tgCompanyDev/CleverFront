import { classNames } from "@/shared/libs/helpers";
import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type TSectionTabItem = {
    title: string;
    id: string;
    colors: string;
    icon?: ReactNode;
    type?: string;
    onSelect?: (type: string) => void;
}

type TSectionTabsProps = {
    items: TSectionTabItem[];
}

export const SectionTabs: FC<TSectionTabsProps> = ({ items }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const handlePercentButtonClick = (tab: string) => {
        console.log(tab);
    }

    return (
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="percent-buttons list-none flex-1 h-full"
                >
                    <Link to={item.id}>
                        <input
                            className="hidden [&:checked+*]:bg-green [&:checked+*]:text-white"
                            type="radio"
                            id={`percent-button-${index}`}
                            name="percent-buttons"
                            onChange={() => { }}
                            onClick={() => handlePercentButtonClick(item.id)}
                            value={item.id}
                            checked={pathname.includes(item.id)}
                        />

                        <label
                            htmlFor={`percent-button-${index}`}
                            className="py-1 px-3 xl:py-3 xl:px-6 rounded-md cursor-pointer font-semibold bg-gray-base hover:bg-gray-100 flex h-full duration-300 ease-in-out"
                        >

                            <div className="flex items-center justify-center gap-6 p-1">
                                <span className={classNames(
                                    "inline-flex w-10 h-10 rounded-full items-center justify-center",
                                    `bg-gradient-to-tr ${item.colors}`
                                )}>
                                    {item.icon}
                                </span>
                                {item.title}
                            </div>

                        </label>
                    </Link>
                </li>
            ))}
        </div>
    )
}

