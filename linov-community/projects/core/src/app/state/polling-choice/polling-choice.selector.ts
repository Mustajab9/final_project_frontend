import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPollingChoiceDtoDataRes } from '../../dto/polling-choice/get-all-polling-choice-dto-data-res'

const pollingChoiceStore: string = 'pollingChoiceStore'

const pollingChoiceSelectorInit = createSelector(
    createFeatureSelector(pollingChoiceStore),
    (state: { init: boolean }) => state.init
)

const pollingChoiceSelectorAll = createSelector(
    createFeatureSelector(pollingChoiceStore),
    (state: { payload: GetAllPollingChoiceDtoDataRes[] }) => state.payload
)

const pollingChoiceSelectorById = (id: string) => createSelector(
    createFeatureSelector(pollingChoiceStore),
    (state: { payload: GetAllPollingChoiceDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const pollingChoiceSelectorUpdate = createSelector(
    createFeatureSelector(pollingChoiceStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const pollingChoiceSelectorInsert = createSelector(
    createFeatureSelector(pollingChoiceStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {pollingChoiceSelectorInit, pollingChoiceSelectorAll, pollingChoiceSelectorById, pollingChoiceSelectorUpdate, pollingChoiceSelectorInsert }