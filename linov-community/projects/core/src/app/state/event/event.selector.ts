import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllEventDtoDataRes } from '../../dto/event/get-all-event-dto-data-res'

const eventStore: string = 'eventStore'

const eventSelectorInit = createSelector(
    createFeatureSelector(eventStore),
    (state: { init: boolean }) => state.init
)

const eventSelectorAll = createSelector(
    createFeatureSelector(eventStore),
    (state: { payload: GetAllEventDtoDataRes[] }) => state.payload
)

const eventSelectorById = (id: string) => createSelector(
    createFeatureSelector(eventStore),
    (state: { payload: GetAllEventDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const eventSelectorUpdate = createSelector(
    createFeatureSelector(eventStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const eventSelectorInsert = createSelector(
    createFeatureSelector(eventStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {eventSelectorInit, eventSelectorAll, eventSelectorById, eventSelectorUpdate, eventSelectorInsert }