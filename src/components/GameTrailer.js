import { Component } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player/youtube';

class GameTrailer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        video: this.props.game.videos,
    }
}

componentDidMount() {
    // console.log(this.state.video)
    try {
      axios.get(`https://mgl-be.herokuapp.com/game/${this.props.game.id}/${this.state.video[0]}/`)
      .then(res => {
        this.setState({video: res.data})
        // console.log(this.state.video);
      })
      this.setState({isLoading: false})
    } catch {
      this.setState({isLoading: false})
    }
}

componentWillUnmount() {

}

  render() {
    return (
      this.state.isLoading ? (
        <div>
            Loading...
        </div>
      ) : (
          <div className='container'>
            <div className='row'>
              <div className='col'>
                {this.state.video === undefined ? <p align='center'>This Game Doesn't Have any trailer</p> : <ReactPlayer controls url={this.state.video} width='auto' height='200%' />}
              </div>
            </div>
          </div>
      )
    )
  }
}

export default GameTrailer
