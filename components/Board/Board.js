import HTML5Backend from 'react-dnd-html5-backend';
import Piece from '../Piece/Piece'
import React from 'react'
import Square from '../Square/Square'

import { DragDropContext, DropTarget } from 'react-dnd';

function Board(props) {
  const piecesByPosition = props.pieces.reduce((positionGraph, piece) => {
    if (piece.container === 'board') {
      return { ...positionGraph, [piece.position]: piece };
    }
    return positionGraph;
  }, {});

  return (
    <div className="table">
      <div className="board">
        {
          Array.from({ length: 64 }, (value, position) => {
            const x = position % 8;
            const y = Math.floor(position / 8);
            const black = (x + y) % 2 === 1;

            return (
              <div key={position} style={{ height: '62.5px', width: '62.5px' }}>
                <Square black={black} dispatcher={props.dispatcher} piece={piecesByPosition[position]} position={position}>
                  {piecesByPosition[position] && <Piece dispatcher={props.dispatcher} piece={piecesByPosition[position]} />}
                </Square>
              </div>
            );
          })
        }
      </div>

      <div className="stack">
        <div className="stack-pieces">
        { props.pieces.filter(piece => piece.container === 'stack')
            .map((piece, index) => (
              <Piece key={piece.container + index} dispatcher={props.dispatcher} piece={piece} />
            ))
        }
        </div>
      </div>

      <style jsx>
        {`
          .board {
            display: flex;
            height: 500px;
            flex-wrap: wrap;
            width: 500px;
          }
          .stack {
            background-color: #1af;
            height: 63px;
            margin-top: 20px;
            overflow-x: scroll;
            overflow-y: hidden;
            width: 500px;
          }
          .stack-pieces {
            display: flex;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default DragDropContext(HTML5Backend)(Board);
