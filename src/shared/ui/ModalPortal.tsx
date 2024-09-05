
import { createPortal } from 'react-dom'
import { useRef, ReactNode, useState, useEffect } from 'react'
import { classNames } from '../libs/helpers';
import { CloseOutlined } from '@ant-design/icons';

interface IModalProps {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void,
    title?: string,
    transparent?: boolean
    withoutCloseButton?: boolean,
}

export const ModalPortal = ({ children, isOpen, onClose, title, transparent=false, withoutCloseButton=false }: IModalProps) => {
    const [mounted, setMounted] = useState(false);
    const refModal = useRef<HTMLDivElement>(null);
    const refModalInner = useRef<HTMLDivElement>(null);
    const modalInnerHeight = refModalInner.current?.offsetHeight
    const [windowInnerHeight, setWindowInnerHeight] = useState(0)
    const main = document?.querySelector("main")
    const body = document?.querySelector("body")
    const modalRoot = document?.querySelector("#modal-root")

    if (isOpen) {
        main.style.filter = "blur(5px)"
        body.style.overflow = "hidden"
    } else {
        main.style.filter = "none"
        body.style.overflow = "auto"
    }

    // useEffect(() => {
    //     console.log(66, 'useEffect');
    // }, [isOpen, main.style, body.style])

    useEffect(() => setMounted(true), [])

    const handleWindowResize = () => {
        setWindowInnerHeight(window.innerHeight)
    }

    useEffect(() => {
        setWindowInnerHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    const renderContent = () => {
        return (
            <div ref={refModal} className={classNames(
                "fixed w-full h-full bg-black/[0.5] inset-0 z-50 transition-opacity overflow-y-auto",
                "flex items-center justify-center",
                `${isOpen ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"}`

            )} onMouseDown={onClose}>
                <div ref={refModalInner}
                    className={classNames(
                    "p-5 rounded-[17px] transition-transform",
                    `${transparent ? "bg-transparent" : "bg-warmGray-100"}`,
                    `${isOpen ? "scale-100" : "scale-50"}`,
                    `${modalInnerHeight && (modalInnerHeight > windowInnerHeight ? "absolute top-0" : "")}`
                )} onMouseDown={(e) => e.stopPropagation()}>
                    {!withoutCloseButton && (
                        <div className={classNames(
                            'mb-8 flex',
                            `${title ? "justify-between" : "justify-end"}`
                        )}>
                            {title && <h2 className='text-xl font-bold'>{title}</h2>}
                            <button className="w-[30px] h-[30px] flex items-center justify-center bg-dark-blue rounded-full"
                                onClick={onClose}
                            >
                                <CloseOutlined />
                            </button>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        );
    }
    return createPortal(renderContent(), modalRoot)
}