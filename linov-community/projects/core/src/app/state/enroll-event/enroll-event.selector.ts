import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllEnrollEventDtoDataRes } from '../../dto/enroll-event/get-all-enroll-event-dto-data-res'

const enrollEventStore: string = 'enrollEventStore'

const enrollEventSelectorInit = createSelector(
    createFeatureSelector(enrollEventStore),
    (state: { init: boolean }) => state.init
)

const enrollEventSelectorAll = createSelector(
    createFeatureSelector(enrollEventStore),
    (state: { payload: GetAllEnrollEventDtoDataRes[] }) => state.payload
)

const enrollEventSelectorById = (id: string) => createSelector(
    createFeatureSelector(enrollEventStore),
    (state: { payload: GetAllEnrollEventDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const enrollEventSelectorUpdate = createSelector(
    createFeatureSelector(enrollEventStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const enrollEventSelectorInsert = createSelector(
    createFeatureSelector(enrollEventStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {enrollEventSelectorInit, enrollEventSelectorAll, enrollEventSelectorById, enrollEventSelectorUpdate, enrollEventSelectorInsert }