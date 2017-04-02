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
  const posX = 62 * (props.piece.id % 8);
  const posY = 62 * Math.floor(props.piece.id / 8);

  return props.connectDragSource(
    <div className={`piece ${props.piece.container === 'stack' ? 'stacked' : ''}`} style={{
      backgroundImage: `url(${props.pictureUrl || 'https://im.ages.io/8s2vIpeuIn?size=1000x1000'})`,
      backgroundPosition: `-${posX}px -${posY}px`,
      backgroundSize: '500px 500px',
      height: '62px',
      opacity: props.isDragging ? 0.5 : 1,
      width: '62px',
    }}>
      <style jsx>{`
        .piece {
          display: inline-block;
          cursor: move;
          font-size: 3em;
          font-weight: bold;
          height: 62.5px;
          width: 62.5px;
        }
        .stacked {
          flex: 0 0 62.5px;
        }
      `}</style>
    </div>
  );
}

export default DragSource('PIECE', pieceSource, collect)(Piece);
