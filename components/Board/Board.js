import React from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from '../Square/Square'
import Piece from '../Piece/Piece'

function renderSquare(dispatcher, piece, position) {
  const x = position % 8;
  const y = Math.floor(position / 8);
  const black = (x + y) % 2 === 1;

  return (
    <div key={position} style={{ width: '12.5%', height: '12.5%' }}>
      <Square black={black} dispatcher={dispatcher} piece={piece} position={position}>
        {piece && <Piece dispatcher={dispatcher} piece={piece} />}
      </Square>
    </div>
  );
}

function Board(props) {
  const positions = props.pieces.reduce((positionGraph, piece) => {
    return { ...positionGraph, [piece.position]: piece };
  }, {});

  const squares = [];
  for (let position = 0; position < 64; position++) {
    squares.push(renderSquare(props.dispatcher, positions[position], position));
  }

  return (
    <div className="board">
      {squares}
      <style jsx>{`
      .board {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        width: 100%;
      }
    `}</style>
    </div>
  );
}

export default DragDropContext(HTML5Backend)(Board);
