import {SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM} from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = formValues => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const formObj = JSON.parse(formValues)
        const response = await streams('/streams', JSON.stringify({...formObj, userId}), 'POST');
        const json = await response.json();
        dispatch({type: CREATE_STREAM, payload: json});
        history.push('/');
    }
}

export const fetchStreams = () => {
    return async dispatch => {
        const response = await streams('/streams', null , 'GET');
        const json = await response.json();
        dispatch({type: FETCH_STREAMS, payload: json});
    }
}

export const fetchStream = id => async dispatch => {
    const response = await streams(`/streams/${id}`, null, 'GET');
    const json = await response.json();
    dispatch({type: FETCH_STREAM, payload: json});
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams(`/streams/${id}`, formValues, 'PATCH');
    const json = await response.json();
    dispatch({type: EDIT_STREAM, payload: json});
    history.push('/');
}

export const deleteStream = id => async dispatch => {
    await streams(`/streams/${id}`, null, 'DELETE');
    dispatch({type: DELETE_STREAM, payload: id});
    history.push('/');
}