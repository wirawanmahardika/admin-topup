import type { brandReducerActionType, brandType } from "../../types/brandType";

export default function brandReducer(state: brandType[], action: brandReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as brandType[]
        default:
            return state 
    }
}