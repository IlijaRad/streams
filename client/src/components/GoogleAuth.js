import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2', async () => {
            await window.gapi.client.init({
                clientId: '879563812487-nat98qh095on051hgtar9comi3kptsdh.apps.googleusercontent.com',
                scope: 'email'
            })
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }
    
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn){
            return (
                <div>
                    <button onClick={this.onSignOutClick}>Sign out</button>
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.onSignInClick}>Sign in with Google</button>
                </div>
            )
        }
    }
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);