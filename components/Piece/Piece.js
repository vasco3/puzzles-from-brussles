import { DragSource } from 'react-dnd';
import React from 'react'
import css from './css'

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
  return props.connectDragSource(
    <div className={css} style={{
      opacity: props.isDragging ? 0.5 : 1,
    }}>
    ♘
    </div>
  );
}

export default DragSource('PIECE', pieceSource, collect)(Piece);
