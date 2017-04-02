import React from 'react'
import Board from '../components/Board/Board'
// import Stack from '../components/Stack/Stack'

function generatePieces(length) {
  return Array.from({ length }, (value, id) => ({id, position: id}))
    .sort(() => Math.random() - 0.5)
    .map((piece, index) => ({...piece, position: index}))
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: 'https://im.ages.io/8s2vIpeuIn?size=1000x1000',
      pictureUrlInput: '',
      pieces: []
    };
    this.dispatcher = this.dispatcher.bind(this);
    this.loadPictureUrl = this.loadPictureUrl.bind(this);
    this.updatePictureUrlInput = this.updatePictureUrlInput.bind(this);
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
      case 'START':
        this.setState({
          pieces: generatePieces(10)
        })
        return
      default:
        return
    }
  }

  loadPictureUrl() {
    this.setState({
      pictureUrl: this.state.pictureUrlInput,
      pictureUrlInput: '',
    })
  }

  updatePictureUrlInput(event = {}) {
    this.setState({
      pictureUrlInput: (event.target || {}).value || '',
    })
  }

  render() {
    const dispatcher = this.dispatcher;
    return (
      <div style={{ height: '500px', width: '500px' }}>
        <Board dispatcher={dispatcher} pieces={this.state.pieces} />
        <input type="url" defaultValue="" onChange={this.updatePictureUrlInput} placeholder="http://www.images.com/image.png" />
        <button onClick={this.loadPictureUrl}>load picture</button>
        <button onClick={() => dispatcher({type: 'START'})}>start</button>
      </div>
    )
  }
}

