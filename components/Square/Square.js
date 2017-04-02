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
  let backgroundColor = props.black ? 'black' : 'white';

  if (props.isOver) {
    if (props.canDrop) {
      backgroundColor = 'green'
    } else {
      backgroundColor = 'red'
    }
  } else if (props.canDrop) {
    backgroundColor = 'yellow'
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
