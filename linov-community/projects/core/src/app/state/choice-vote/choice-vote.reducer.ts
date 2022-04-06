import { createReducer, on } from '@ngrx/store'

import { insertChoiceVoteSuccessAction, loadChoiceVoteSuccessAction } from './choice-vote.action'
import { GetAllChoiceVoteDtoDataRes } from '../../dto/choice-vote/get-all-choice-vote-dto-data-res'

const getAllChoiceVoteDtoDataRes: GetAllChoiceVoteDtoDataRes[] = []

const initialState = {
    payload: getAllChoiceVoteDtoDataRes,
    init: false,
    updateProgress: false,
    insertProgress: false
}

export const choiceVoteReducer = createReducer(
    initialState,
    on(loadChoiceVoteSuccessAction, (state, { payload }) => {
        return { ...state, payload, init: true }
    }),
    on(insertChoiceVoteSuccessAction, (state, { payload }) => {
        const newData = [...state.payload]
        newData.push(payload)

        return { ...state, payload: newData, insertProgress: true }
    })
)