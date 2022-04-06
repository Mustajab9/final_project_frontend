import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllIndustryDtoDataRes } from '../../dto/industry/get-all-industry-dto-data-res'

const industryStore: string = 'industryStore'

const industrySelectorInit = createSelector(
    createFeatureSelector(industryStore),
    (state: { init: boolean }) => state.init
)

const industrySelectorAll = createSelector(
    createFeatureSelector(industryStore),
    (state: { payload: GetAllIndustryDtoDataRes[] }) => state.payload
)

const industrySelectorById = (id: string) => createSelector(
    createFeatureSelector(industryStore),
    (state: { payload: GetAllIndustryDtoDataRes[] }) => {
        const newData = state.payload.filter(brand => brand.id == id)
        return newData[0]
    }
)

const industrySelectorUpdate = createSelector(
    createFeatureSelector(industryStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const industrySelectorInsert = createSelector(
    createFeatureSelector(industryStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const industrySelectorDelete = createSelector(
    createFeatureSelector(industryStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { industrySelectorInit, industrySelectorAll, industrySelectorById, industrySelectorUpdate, industrySelectorInsert, industrySelectorDelete }