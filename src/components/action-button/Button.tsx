import { MouseEvent, RefObject, useCallback, useRef } from "react";
import s from "./styles.module.css";

interface ButtonProps {
    text: string
    buttonId: string;
    cardId: number;
    onChooseStart: (ref: RefObject<HTMLButtonElement>) => void;
}

export const ActionButton: React.FC<ButtonProps> = ({ buttonId, cardId, onChooseStart, text }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onChooseStart(buttonRef);
        // if (buttonRef.current) {
        //     console.log(`Клик на кнопку ${buttonId} в карточке ${cardId}`, buttonRef);
        // }
    }, [buttonId, cardId, onChooseStart]);

    return (
        <button ref={buttonRef} onClick={handleClick} className={s.button} id={cardId+buttonId}>
            {text}
        </button>
    );
};