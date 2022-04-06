import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllBookmarkDtoDataRes } from '../../dto/bookmark/get-all-bookmark-dto-data-res'

const bookmarkStore: string = 'bookmarkStore'

const bookmarkSelectorInit = createSelector(
    createFeatureSelector(bookmarkStore),
    (state: { init: boolean }) => state.init
)

const bookmarkSelectorAll = createSelector(
    createFeatureSelector(bookmarkStore),
    (state: { payload: GetAllBookmarkDtoDataRes[] }) => state.payload
)

const bookmarkSelectorById = (id: string) => createSelector(
    createFeatureSelector(bookmarkStore),
    (state: { payload: GetAllBookmarkDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const bookmarkSelectorInsert = createSelector(
    createFeatureSelector(bookmarkStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

export {bookmarkSelectorInit, bookmarkSelectorAll, bookmarkSelectorById, bookmarkSelectorInsert }