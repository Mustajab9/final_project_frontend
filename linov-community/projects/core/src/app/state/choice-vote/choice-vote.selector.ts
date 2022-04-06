import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllChoiceVoteDtoDataRes } from '../../dto/choice-vote/get-all-choice-vote-dto-data-res'

const choiceVoteStore: string = 'choiceVoteStore'

const choiceVoteSelectorInit = createSelector(
    createFeatureSelector(choiceVoteStore),
    (state: { init: boolean }) => state.init
)

const choiceVoteSelectorAll = createSelector(
    createFeatureSelector(choiceVoteStore),
    (state: { payload: GetAllChoiceVoteDtoDataRes[] }) => state.payload
)

const choiceVoteSelectorById = (id: string) => createSelector(
    createFeatureSelector(choiceVoteStore),
    (state: { payload: GetAllChoiceVoteDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const choiceVoteSelectorUpdate = createSelector(
    createFeatureSelector(choiceVoteStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const choiceVoteSelectorInsert = createSelector(
    createFeatureSelector(choiceVoteStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {choiceVoteSelectorInit, choiceVoteSelectorAll, choiceVoteSelectorById, choiceVoteSelectorUpdate, choiceVoteSelectorInsert }