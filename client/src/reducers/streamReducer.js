import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

const mapKeys = streamList => {
    let b = {};
    for (let i = 0; i < streamList.length; i++){
        b[streamList[i].id] = streamList[i];
    }
    return b;
}

export default (state = {}, action) => {
    switch (action.type){
        case FETCH_STREAMS:
            return {...state, ...mapKeys(action.payload)};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload]: action.payload};
        case DELETE_STREAM:
            let {[action.payload]: omit, ...res} = state;
            return res; 
        default: 
            return state;
    }
}

 