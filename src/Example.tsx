import React, { ReactNode } from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Draggable from 'react-draggable';

const boxStyle = {border: 'grey solid 2px', borderRadius: '10px', padding: '5px', height: 100, width: 100};

const DraggableBox = ({id, children}: {id: any, children: ReactNode}) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={boxStyle}>
                {children}
            </div>
        </Draggable>
    );
};

export function V2Example() {
    return (
        <div>
            <Xwrapper>
                <DraggableBox id={'elem1'}>dasdsads</DraggableBox>
                <DraggableBox id={'elem2'}>dasdsads</DraggableBox>
                <Xarrow start={'elem1'} end="elem2"/>
            </Xwrapper>
        </div>
    );
}

export default V2Example


{/* <div style={{ height: '500px', margin: '50px', width: "100%" }}>
<ArcherContainer strokeColor="red">
  <div style={rootStyle}>
    <ArcherElement
      id="root"
      relations={[
        {
          targetId: 'element2',
          targetAnchor: 'top',
          sourceAnchor: 'bottom',
          style: { strokeDasharray: '5,5' },
        },
      ]}
    >
      <div style={boxStyle}>Root</div>
    </ArcherElement>
  </div>

  <div style={rowStyle}>
    <ArcherElement
      id="element2"
      relations={[
        {
          targetId: 'element3',
          targetAnchor: 'left',
          sourceAnchor: 'right',
          style: { strokeColor: 'blue', strokeWidth: 1 },
          label: <div style={{ marginTop: '-20px' }}>Arrow 2</div>,
        },
      ]}
    >
      <div style={boxStyle}>Element 2</div>
    </ArcherElement>

    <ArcherElement id="element3">
      <div style={boxStyle}>Element 3</div>
    </ArcherElement>

    <ArcherElement
      id="element4"
      relations={[
        {
          targetId: 'root',
          targetAnchor: 'right',
          sourceAnchor: 'left',
          label: 'Arrow 3',
        },
      ]}
    >
      <div style={boxStyle}>Element 4</div>
    </ArcherElement>
  </div>
</ArcherContainer>
</div> */}