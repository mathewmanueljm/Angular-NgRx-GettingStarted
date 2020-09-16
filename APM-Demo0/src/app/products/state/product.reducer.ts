import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State { // this is removed from the state for lazy loading
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = { //declare the initial state of product state slice
    showProductCode: true,
    currentProduct: null,
    products: []
};

export const productReducer = createReducer<ProductState>(
    initialState,  //
    on(createAction('[Product] Toggle Product Code'), (state): ProductState => { //action part where toggle product code is the action name of this store(state)
        //console.log('original state: '+ JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    })
);