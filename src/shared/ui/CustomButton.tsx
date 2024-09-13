import { Button, ConfigProvider } from "antd"
import { BaseButtonProps } from "antd/es/button/button"
import { FC } from "react"
type TCustomButtonProps = BaseButtonProps & {
    btnColor?: string
}
export const CustomButton: FC<TCustomButtonProps> = (props) => {
    //const { btnColor = "green" } = props
    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#0b6e3a',

                    // Alias Token
                    colorBgContainer: '#0b6e3a',
                },
            }}>
            <Button
                {...props}
            >
                {props.children}
            </Button></ConfigProvider>
    )
}