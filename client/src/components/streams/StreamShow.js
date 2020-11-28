import React from 'react';
import flv from 'flv.js';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamShow extends React.Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef();
    }
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        this.player.destroy();
    }

    buildPlayer(){
        if (this.player || !this.props.stream){
            return;
        }
        this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        })
        this.flvPlayer.attachMediaElement(this.videoRef.current);
        this.flvPlayer.load();
        this.flvPlayer.play();
    }
    
    render(){
        if (!this.props.stream){
            return <div>Loading...</div>
        }
        return (
            <div>
                <video ref={this.videoRef} />
                <h3>{this.props.stream.title}</h3>
                <p>{this.props.stream.description}</p>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);