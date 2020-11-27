import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchStreams} from '../../actions';

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId ) {
            return (
                <div>
                    <Link to={`/streams/edit/${stream.id}`}><button>Edit</button></Link>
                    <Link to=""><button>Delete</button></Link>
                </div>
            )
        }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return (
                <div key={stream.id} style={{marginBottom: "20px"}}>
                    <div style={{fontSize: '18px', fontWeight: "bold", marginBottom: '10px'}}>{stream.title}</div>
                    <div style={{display: 'flex', width: '300px', justifyContent:'space-between'}}>
                        <div>{stream.description}</div>
                        {this.renderAdmin(stream)}
                    </div>
                </div>
            )
        })
    }

    renderCreate(){
        if (this.props.isSignedIn){
            return (
                <div style={{width: '300px', textAlign: 'right'}}>
                    <Link to="/streams/new">
                        <button>Create Stream</button>
                    </Link>
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                <h2>Streams</h2>
                {this.renderList()}
                {this.renderCreate()}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);