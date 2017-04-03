import React from 'react'
import Head from 'next/head'
import Board from '../components/Board/Board'

function generatePieces(length) {
  // `Array.from` will create an array from anything that looks like an iterator
  return Array.from({ length }, (value, id) => ({id, container: 'stack'}))
    // Randomizing the order
    .sort(() => Math.random() - 0.5)
    // Finally set the new order in each piece
    .map((piece, index) => ({...piece, position: index}))
}

// This is the main container
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    const piecesCount = 100;

    this.state = {
      piecesCount,
      pictureUrl: '/static/scott-umstattd-93198.jpg',
      pieces: generatePieces(piecesCount)
    };
    this.dispatcher = this.dispatcher.bind(this);
  }

  // Compact Flux pattern
  dispatcher(payload) {
    const { action, type } = payload;

    switch (type) {
      case 'MOVEPIECE':
        // Save the new position to the piece that has been moved
        const pieces = this.state.pieces.map(piece => {
          if (action.piece.id === piece.id) {
            return {
              ...piece,
              container: 'board',
              position: action.position,
            }
          }
          return piece
        });
        this.setState({ pieces });
        return;
      default:
        return
    }
  }

  render() {
    const dispatcher = this.dispatcher;
    const { pictureUrl } = this.state;
    return (
      <div className="index">
        <Head>
          <title>Puzzles from Brussles</title>
          <style>{`
              @import url(https://fonts.googleapis.com/css?family=Bungee+Shade);

              body {
                font-family: 'Bungee Shade', cursive;
              }

              body::before {
                background-image: url(${pictureUrl});
                background-size: cover;
                bottom: 0;
                content: ' ';
                filter: brightness(4) blur(20px);
                left: 0;
                position: fixed;
                right: 0;
                top: 0;
                z-index: -1;
              }
            `}
          </style>
        </Head>

        <h1 className="title">Puzzles from Bruzzles</h1>

        <Board dispatcher={dispatcher}
               piecesCount={this.state.piecesCount}
               pictureUrl={pictureUrl}
               pieces={this.state.pieces} />

        <h3 className="courtesy">
          Image courtesy
          of <a href="https://unsplash.com/photos/Vy-sy7IiGok" target="_blank">Scott Umstattd</a>
        </h3>

        <h5 className="credits">
          Created
          by <a href="https://www.cuadranteweb.com" target="_blank">Jorge Cuadra</a>
        </h5>

        <style jsx>{`
            .courtesy, .credits {
              background-color: rgba(255, 255, 255, 0.5);
              color: rgba(5, 5, 5, 0.7);
              padding: 7px 0;
              text-align: center;
            }

            .courtesy a, .credits a {
              color: rgba(5, 5, 5, 0.9);
            }

            .index {
              display: flex;
              flex-direction: column;
              margin: 40px auto;
              width: 500px;
            }

            .title {
              background-color: rgba(255, 255, 255, 0.5);
              color: rgba(5, 5, 5, 0.7);
              padding: 7px 0;
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}

