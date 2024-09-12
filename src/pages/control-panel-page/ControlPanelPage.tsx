import { SectionTabs } from "@/entities/section-tabs/ui/SectionTabs"

const ControlPanelPage = () => {

    const items = [
        {
            title: "BOTS",
            id: "bots"
        },
        {
            title: "KANALS",
            id: "channels"
        }
    ]
    return (
        <>
            <div className="container">
                <SectionTabs items={items} />
            </div>
        </>
    )
}

export default ControlPanelPage;