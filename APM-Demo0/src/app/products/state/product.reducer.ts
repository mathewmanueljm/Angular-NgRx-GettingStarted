import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductAction from './product.action';

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

//create  selectors
const getProductFeatureState = createFeatureSelector<ProductState>('product');//this is the feature name of the reducer in the product module
//selectors are created to individually remove the items from the state as shown below
export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);
// end of selectors

export const productReducer = createReducer<ProductState>(
    initialState,  // ProductAction is the alias or namespace in the import statement above as there are other action selectors in the product.action.ts
    on(ProductAction.toggleProductCode, (state): ProductState => { //action part where toggle product code is the action name of this store(state). the action is now action selector
        //console.log('original state: '+ JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductAction.setCurrentProduct, (state,action): ProductState =>{ // the action is the data associated with the current product which has the current product selected
        return{
            ...state,
            currentProduct:action.product
        };
    }),
    on(ProductAction.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct : null
        };
    }),
    on(ProductAction.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id:0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        };
    })
);