import { createAction, props } from '@ngrx/store'

import { GetAllThreadAttachmentDtoDataRes } from '../../dto/thread-attachment/get-all-thread-attachment-dto-data-res'
import { InsertThreadAttachmentDtoReq } from '../../dto/thread-attachment/insert-thread-attachment-dto-req'
import { GetByThreadAttachmentIdDtoDataRes } from '../../dto/thread-attachment/get-by-thread-attachment-id-dto-data-res'

const loadThreadAttachmentAction = createAction(
    '[ThreadAttachment Page] load thread Attachment',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadThreadAttachmentSuccessAction = createAction(
    '[ThreadAttachment Page] load thread Attachment success',
    props<{ payload: GetAllThreadAttachmentDtoDataRes[] }>()
)

const deleteThreadAttachmentAction = createAction(
    '[ThreadAttachment Page] delete thread Attachment',
    props<{ payload: string }>()
)

const deleteThreadAttachmentSuccessAction = createAction(
    '[ThreadAttachment Page] delete thread Attachment success',
    props<{ payload: string }>()
)

const insertThreadAttachmentAction = createAction(
    '[ThreadAttachment Page] insert thread Attachment',
    props<{ payload: InsertThreadAttachmentDtoReq }>()
)

const insertThreadAttachmentSuccessAction = createAction(
    '[ThreadAttachment Page] insert thread Attachment success',
    props<{ payload: GetByThreadAttachmentIdDtoDataRes }>()
)

export {
    loadThreadAttachmentAction, loadThreadAttachmentSuccessAction,
    deleteThreadAttachmentAction, deleteThreadAttachmentSuccessAction, insertThreadAttachmentAction, insertThreadAttachmentSuccessAction
}