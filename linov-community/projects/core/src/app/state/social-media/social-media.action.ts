import { createAction, props } from '@ngrx/store'

import { UpdateSocialMediaDtoReq } from '../../dto/social-media/update-social-media-dto-req'
import { GetAllSocialMediaDtoDataRes } from '../../dto/social-media/get-all-social-media-dto-data-res'
import { InsertSocialMediaDtoReq } from '../../dto/social-media/insert-social-media-dto-req'
import { GetBySocialMediaIdDtoDataRes } from '../../dto/social-media/get-by-social-media-id-dto-data-res'

const loadSocialMediaAction = createAction(
    '[SocialMedia Page] load social media',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadSocialMediaSuccessAction = createAction(
    '[SocialMedia Page] load social media success',
    props<{ payload: GetAllSocialMediaDtoDataRes[] }>()
)

const updateSocialMediaAction = createAction(
    '[SocialMedia Page] update social media',
    props<{ payload: UpdateSocialMediaDtoReq }>()
)

const updateSocialMediaSuccessAction = createAction(
    '[SocialMedia Page] update social media success',
    props<{ payload: UpdateSocialMediaDtoReq }>()
)

const deleteSocialMediaAction = createAction(
    '[SocialMedia Page] delete social media',
    props<{ payload: string }>()
)

const deleteSocialMediaSuccessAction = createAction(
    '[SocialMedia Page] delete social media success',
    props<{ payload: string }>()
)

const insertSocialMediaAction = createAction(
    '[SocialMedia Page] insert social media',
    props<{ payload: InsertSocialMediaDtoReq }>()
)

const insertSocialMediaSuccessAction = createAction(
    '[SocialMedia Page] insert social media success',
    props<{ payload: GetBySocialMediaIdDtoDataRes }>()
)

export {
    loadSocialMediaAction, loadSocialMediaSuccessAction, updateSocialMediaAction, updateSocialMediaSuccessAction,
    deleteSocialMediaAction, deleteSocialMediaSuccessAction, insertSocialMediaAction, insertSocialMediaSuccessAction
}