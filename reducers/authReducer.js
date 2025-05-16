import { SET_CURRRENT_USER } from '../action/action-type';

const init = { authendicated : false, user : {}  };

export default function(state = init, action){
    switch(action.type){
        case SET_CURRRENT_USER:
            return {...state, authendicated : !isEmpty(action.payload),
                user : action.payload};
        default:
            return state; 
    }
}