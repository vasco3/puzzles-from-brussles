import React from 'react'
import Head from 'next/head'
import Board from '../components/Board/Board'

function generatePieces(length) {
  return Array.from({ length }, (value, id) => ({id, container: 'stack'}))
    .sort(() => Math.random() - 0.5)
    .map((piece, index) => ({...piece, position: index}))
}

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

  dispatcher(payload) {
    const { action, type } = payload;

    switch (type) {
      case 'MOVEPIECE':
        const pieces = this.state.pieces.map(piece => {
          if (action.piece.id === piece.id) {
            return { ...piece, container: 'board', position: action.position }
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
              @import url(https://fonts.googleapis.com/css?family=Macondo);

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

        <Board dispatcher={dispatcher}
               piecesCount={this.state.piecesCount}
               pictureUrl={pictureUrl}
               pieces={this.state.pieces} />

        <h3 className="courtesy">
          Image courtesy
          of <a href="https://unsplash.com/photos/Vy-sy7IiGok" target="_blank">Scott Umstand</a>
        </h3>
        <style jsx>{`
            .courtesy {
              background-color: rgba(255, 255, 255, 0.5);
              color: rgba(5, 5, 5, 0.7);
              font-family: 'Macondo', cursive;
              padding: 7px 0;
              text-align: center;
            }

            .courtesy a {
              color: rgba(5, 5, 5, 0.9);
            }

            .index {
              display: flex;
              flex-direction: column;
              margin: 40px auto;
              width: 500px;
            }
          `}
        </style>
      </div>
    )
  }
}

