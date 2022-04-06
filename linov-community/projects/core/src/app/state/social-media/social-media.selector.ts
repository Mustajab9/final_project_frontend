import { createFeatureSelector, createSelector } from '@ngrx/store'

import { GetAllSocialMediaDtoDataRes } from '../../dto/social-media/get-all-social-media-dto-data-res'

const socialMediaStore: string = 'socialMediaStore'

const socialMediaSelectorInit = createSelector(
    createFeatureSelector(socialMediaStore),
    (state: { init: boolean }) => state.init
)

const socialMediaSelectorAll = createSelector(
    createFeatureSelector(socialMediaStore),
    (state: { payload: GetAllSocialMediaDtoDataRes[] }) => state.payload
)

const socialMediaSelectorById = (id: string) => createSelector(
    createFeatureSelector(socialMediaStore),
    (state: { payload: GetAllSocialMediaDtoDataRes[] }) => {
        const newData = state.payload.filter(comp => comp.id == id)
        return newData[0]
    }
)

const socialMediaSelectorUpdate = createSelector(
    createFeatureSelector(socialMediaStore),
    (state: {updateProgress: boolean}) => state.updateProgress
)

const socialMediaSelectorInsert = createSelector(
    createFeatureSelector(socialMediaStore),
    (state: {insertProgress: boolean}) => state.insertProgress
)

const socialMediaSelectorDelete = createSelector(
    createFeatureSelector(socialMediaStore),
    (state: {deleteProgress: boolean}) => state.deleteProgress
)

export { socialMediaSelectorInit, socialMediaSelectorAll, socialMediaSelectorById, socialMediaSelectorUpdate, socialMediaSelectorInsert, socialMediaSelectorDelete }