import { ReactNode, RefObject } from "react";
import Draggable from "react-draggable";
import { useXarrow } from "react-xarrows";

export const DraggableBox = ({ children, ref }: { children: ReactNode, ref: RefObject<HTMLDivElement> }) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} nodeRef={ref} >
            {children}
        </Draggable>
    );
};