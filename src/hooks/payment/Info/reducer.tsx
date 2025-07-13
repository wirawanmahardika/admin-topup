import type { paymentReducerActionType, PaymentType } from "../../../types/paymentType";

export function paymentInfoReducer(state: PaymentType[], action: paymentReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as PaymentType[]
        case "delete":
            return state.filter(s => s.id !== action.payload as string)
        default:
            return state
    }
}