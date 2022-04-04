import { createAction, props } from '@ngrx/store'

import { UpdatePriceListEventDtoReq } from '../../dto/price-list-event/update-price-list-event-dto-req'
import { GetAllPriceListEventDtoDataRes } from '../../dto/price-list-event/get-all-price-list-event-dto-data-res'
import { InsertPriceListEventDtoReq } from '../../dto/price-list-event/insert-price-list-event-dto-req'
import { GetByPriceListEventIdDtoDataRes } from '../../dto/price-list-event/get-by-price-list-event-id-dto-data-res'

const loadPriceListEventAction = createAction(
    '[PriceListEvent Page] load price list event',
    props<{ payload: {query: string, startPage: number, maxPage: number} }>()
)

const loadPriceListEventSuccessAction = createAction(
    '[PriceListEvent Page] load price list event success',
    props<{ payload: GetAllPriceListEventDtoDataRes[] }>()
)

const updatePriceListEventAction = createAction(
    '[PriceListEvent Page] update price list event',
    props<{ payload: UpdatePriceListEventDtoReq }>()
)

const updatePriceListEventSuccessAction = createAction(
    '[PriceListEvent Page] update price list event success',
    props<{ payload: UpdatePriceListEventDtoReq }>()
)

const deletePriceListEventAction = createAction(
    '[PriceListEvent Page] delete price list event',
    props<{ payload: string }>()
)

const deletePriceListEventSuccessAction = createAction(
    '[PriceListEvent Page] delete price list event success',
    props<{ payload: string }>()
)

const insertPriceListEventAction = createAction(
    '[PriceListEvent Page] insert price list event',
    props<{ payload: InsertPriceListEventDtoReq }>()
)

const insertPriceListEventSuccessAction = createAction(
    '[PriceListEvent Page] insert price list event success',
    props<{ payload: GetByPriceListEventIdDtoDataRes }>()
)

export {
    loadPriceListEventAction, loadPriceListEventSuccessAction, updatePriceListEventAction, updatePriceListEventSuccessAction,
    deletePriceListEventAction, deletePriceListEventSuccessAction, insertPriceListEventAction, insertPriceListEventSuccessAction
}