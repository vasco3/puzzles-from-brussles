import { DragSource } from 'react-dnd';
import React from 'react'

const pieceSource = {
  beginDrag(props) {
    return props.piece;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    // connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

function Piece(props) {
  const posX = 50 * (props.piece.id % 10);
  const posY = 50 * Math.floor(props.piece.id / 10);

  return props.connectDragSource(
    <div className={`piece ${props.piece.container === 'stack' ? 'stacked' : ''}`} style={{
      backgroundImage: `url(${props.pictureUrl || ''})`,
      backgroundPosition: `-${posX}px -${posY}px`,
      backgroundSize: '500px 500px',
      height: '50px',
      opacity: props.isDragging ? 0.5 : 1,
      width: '50px',
    }}>
      <style jsx>{`
        .piece {
          display: inline-block;
          cursor: move;
          font-size: 3em;
          font-weight: bold;
          height: 50px;
          width: 50px;
        }
        .stacked {
          flex: 0 0 50px;
        }
      `}</style>
    </div>
  );
}

export default DragSource('PIECE', pieceSource, collect)(Piece);
