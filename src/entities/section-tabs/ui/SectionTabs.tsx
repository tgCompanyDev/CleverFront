import { FC, ReactNode } from "react";

type TSectionTabItem = {
    title: string;
    id: string;
    icon?: ReactNode;
    type?: string;
    onSelect?: (type: string) => void;
}

type TSectionTabsProps = {
    items: TSectionTabItem[];
}
export const SectionTabs: FC<TSectionTabsProps> = ({items}) => {

    const handlePercentButtonClick = (tab: string) => {
        console.log(tab);
    }

    return (
        <div className="h-12 flex items-center justify-between bg-white rounded-lg shadow-md">
            {items.map((item, index) => (
                    <li
                        key={index}
                        className="percent-buttons list-none flex-1"
                    >
                        <input
                            className="hidden [&:checked+*]:bg-green [&:checked+*]:text-white"
                            type="radio"
                            id={`percent-button-${index}`}
                            name="percent-buttons"
                            onClick={() => handlePercentButtonClick(item.id)}
                            value={item.id} />
                        <label
                            htmlFor={`percent-button-${index}`}
                            className="py-1 px-3 xl:py-3 xl:px-6 font-semibold bg-gray-base rounded-2xl"
                        >
                            {item.title}
                        </label>
                    </li>
                ))}
        </div>
    )
}

