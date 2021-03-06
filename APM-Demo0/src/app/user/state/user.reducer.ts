
import { createAction, createReducer, on } from '@ngrx/store';

import * as AppState from '../../state/app.state';
import { User } from '../user';

//export interface State extends AppState.State { // this is done for lazy loading
//    user: UserState;
//} // this is needed only if it is lazy loaded as User module is common and unlike the product module. Lazy loading helps faster loading as only those necessary
// components are loaded

export interface UserState {
    maskUserName: boolean;
    //currentUserName: User;
}

const initialState: UserState = {
    maskUserName: true,
    //currentUserName: null
}

export const userReducer = createReducer<UserState>(
        initialState,
        on(createAction('[User] Mask User Name'), (state): UserState =>{
            return {
                ...state,
                maskUserName: !state.maskUserName
            };
        })

);

