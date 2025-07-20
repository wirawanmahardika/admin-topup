import type { productReducerActionType, productType } from "../../types/productType"

export function productReducer(state: productType[], action: productReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as productType[]
        case "delete":
            return state.filter(s => s.id !== action.payload as string)
        default:
            return state
    }
}