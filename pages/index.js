import React from 'react'
import Board from '../components/Board/Board'
// import Stack from '../components/Stack/Stack'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [
        { id: 0, position: 2 },
        { id: 1, position: 8 },
      ]
    };
    this.dispatcher = this.dispatcher.bind(this);
  }

  dispatcher(payload) {
    const { action, type } = payload;

    switch (type) {
      case 'MOVEPIECE':
        const pieces = this.state.pieces.map(piece => {
          if (action.piece.id === piece.id) {
            return { ...piece, position: action.position }
          }
          return piece
        });
        this.setState({ pieces });
        return;
      default:
        return;
    }
  }

  render() {
    return (
      <div style={{ height: '500px', width: '500px' }}>
        <Board dispatcher={this.dispatcher} pieces={this.state.pieces} />
      </div>
    )
  }
}

