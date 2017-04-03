import HTML5Backend from 'react-dnd-html5-backend';
import Piece from '../Piece/Piece'
import React from 'react'
import Square from '../Square/Square'

import { DragDropContext } from 'react-dnd';

function Board(props) {
  // Collection of pieces indexed by their position for quicker access.
  const piecesByPosition = props.pieces.reduce((positionGraph, piece) => {
    // Only displaying in the board the pieces for the board
    if (piece.container === 'board') {
      return {
        ...positionGraph,
        [piece.position]: piece
      };
    }
    return positionGraph;
  }, {});

  return (
    <div className="table">
      <div className="board">
        {
          Array.from({ length: props.piecesCount }, (value, position) => {
            // Alternate background color in squares to
            // create the checkers pattern.
            const x = position % 10;
            const y = Math.floor(position / 10);
            const black = (x + y) % 2 === 1;

            return (
              <div key={position} style={{ height: '50px', width: '50px' }}>
                <Square black={black}
                        dispatcher={props.dispatcher}
                        piece={piecesByPosition[position]}
                        position={position}>
                  { piecesByPosition[position] && (
                    <Piece dispatcher={props.dispatcher}
                           pictureUrl={props.pictureUrl}
                           piece={piecesByPosition[position]} />
                  )}
                </Square>
              </div>
            );
          })
        }
      </div>

      <div className="stack">
        <div className="stack-pieces">
        { props.pieces.filter(piece => piece.container === 'stack')
          /* Show the pieces that are pending to drag to the board. */
            .map((piece, index) => (
              <Piece key={piece.container + index}
                     dispatcher={props.dispatcher}
                     pictureUrl={props.pictureUrl}
                     piece={piece} />
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
            background-color: rgba(17, 170, 255, 0.58);
            height: 60px;
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
