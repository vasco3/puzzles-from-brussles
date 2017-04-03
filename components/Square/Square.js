import React from 'react'
import { DropTarget } from 'react-dnd';

// Drag and Drop target properties
const squareTarget = {
  // square must be empty to be able to receive a drop
  canDrop(props) {
    return !props.piece
  },

  // On drop it will call the action to move piece
  drop(props, monitor) {
    const piece = monitor.getItem();

    props.dispatcher({
      type: 'MOVEPIECE',
      action: {
        piece,
        position: props.position,
      }
    });
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

function Square(props) {
  // Empty Square color
  let backgroundColor = props.black ?
    'rgba(0, 255, 255, 0.1)' :
    'rgba(255, 255, 255, 0.3)';

  // Square color on different drag and drop scenarios
  if (props.isOver) {
    if (props.canDrop) {
      backgroundColor = 'lime'
    } else {
      backgroundColor = 'red'
    }
  } else if (props.canDrop) {
    backgroundColor = 'fuchsia'
  }

  return props.connectDropTarget(
    <div className="square" style={{ backgroundColor }}>
      {props.children}

      <style jsx>{`
        .square {
          height: 100%;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default DropTarget('PIECE', squareTarget, collect)(Square);
