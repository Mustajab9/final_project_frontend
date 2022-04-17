import { createAction, props } from '@ngrx/store'

import { UpdatePriceListMemberDtoReq } from '../../dto/price-list-member/update-price-list-member-dto-req'
import { GetAllPriceListMemberDtoDataRes } from '../../dto/price-list-member/get-all-price-list-member-dto-data-res'
import { InsertPriceListMemberDtoReq } from '../../dto/price-list-member/insert-price-list-member-dto-req'
import { GetByPriceListMemberIdDtoDataRes } from '../../dto/price-list-member/get-by-price-list-member-id-dto-data-res'

const loadPriceListMemberAction = createAction(
    '[PriceListMember Page] load price list member',
    props<{ payload: {startPage: number, maxPage: number, query: string | undefined} }>()
)

const loadPriceListMemberSuccessAction = createAction(
    '[PriceListMember Page] load price list member success',
    props<{ payload: GetAllPriceListMemberDtoDataRes[] }>()
)

const updatePriceListMemberAction = createAction(
    '[PriceListMember Page] update price list member',
    props<{ payload: UpdatePriceListMemberDtoReq }>()
)

const updatePriceListMemberSuccessAction = createAction(
    '[PriceListMember Page] update price list member success',
    props<{ payload: UpdatePriceListMemberDtoReq }>()
)

const deletePriceListMemberAction = createAction(
    '[PriceListMember Page] delete price list member',
    props<{ payload: string }>()
)

const deletePriceListMemberSuccessAction = createAction(
    '[PriceListMember Page] delete price list member success',
    props<{ payload: string }>()
)

const insertPriceListMemberAction = createAction(
    '[PriceListMember Page] insert price list member',
    props<{ payload: InsertPriceListMemberDtoReq }>()
)

const insertPriceListMemberSuccessAction = createAction(
    '[PriceListMember Page] insert price list member success',
    props<{ payload: GetByPriceListMemberIdDtoDataRes }>()
)

export {
    loadPriceListMemberAction, loadPriceListMemberSuccessAction, updatePriceListMemberAction, updatePriceListMemberSuccessAction,
    deletePriceListMemberAction, deletePriceListMemberSuccessAction, insertPriceListMemberAction, insertPriceListMemberSuccessAction
}