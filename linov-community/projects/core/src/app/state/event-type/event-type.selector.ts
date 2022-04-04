import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllEventTypeDtoDataRes } from '../../dto/event-type/get-all-event-type-dto-data-res'

const eventTypeStore: string = 'eventTypeStore'

const eventTypeSelectorInit = createSelector(
    createFeatureSelector(eventTypeStore),
    (state: { init: boolean }) => state.init
)

const eventTypeSelectorAll = createSelector(
    createFeatureSelector(eventTypeStore),
    (state: { payload: GetAllEventTypeDtoDataRes[] }) => state.payload
)

const eventTypeSelectorById = (id: string) => createSelector(
    createFeatureSelector(eventTypeStore),
    (state: { payload: GetAllEventTypeDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const eventTypeSelectorUpdate = createSelector(
    createFeatureSelector(eventTypeStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const eventTypeSelectorInsert = createSelector(
    createFeatureSelector(eventTypeStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export { eventTypeSelectorInit, eventTypeSelectorAll, eventTypeSelectorById, eventTypeSelectorUpdate, eventTypeSelectorInsert }