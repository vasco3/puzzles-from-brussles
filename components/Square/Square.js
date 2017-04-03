import React from 'react'
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props) {
    return !props.piece
  },

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
  let backgroundColor = props.black ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)';

  if (props.isOver) {
    if (props.canDrop) {
      backgroundColor = 'lime'
    } else {
      backgroundColor = 'red'
    }
  } else if (props.canDrop) {
    backgroundColor = 'fuchsia'
  }

  const color = props.black ? 'white' : 'black';

  return props.connectDropTarget(
    <div className="square" style={{ backgroundColor, color }}>
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
