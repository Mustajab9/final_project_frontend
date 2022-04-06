import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllPriceListMemberDtoDataRes } from '../../dto/price-list-member/get-all-price-list-member-dto-data-res'

const priceListMemberStore: string = 'priceListMemberStore'

const priceListMemberSelectorInit = createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: { init: boolean }) => state.init
)

const priceListMemberSelectorAll = createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: { payload: GetAllPriceListMemberDtoDataRes[] }) => state.payload
)

const priceListMemberSelectorById = (id: string) => createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: { payload: GetAllPriceListMemberDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const priceListMemberSelectorUpdate = createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const priceListMemberSelectorInsert = createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const priceListMemberSelectorDelete = createSelector(
    createFeatureSelector(priceListMemberStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { priceListMemberSelectorInit, priceListMemberSelectorAll, priceListMemberSelectorById, priceListMemberSelectorUpdate, priceListMemberSelectorInsert, priceListMemberSelectorDelete }