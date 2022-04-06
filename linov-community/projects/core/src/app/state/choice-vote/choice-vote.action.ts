import { createAction, props } from '@ngrx/store'

import { GetAllChoiceVoteDtoDataRes } from '../../dto/choice-vote/get-all-choice-vote-dto-data-res'
import { InsertChoiceVoteDtoReq } from '../../dto/choice-vote/insert-choice-vote-dto-req'
import { GetByChoiceVoteIdDtoDataRes } from '../../dto/choice-vote/get-by-choice-vote-id-dto-data-res'

const loadChoiceVoteAction = createAction(
    '[ChoiceVote Page] load choice vote'
)

const loadChoiceVoteSuccessAction = createAction(
    '[ChoiceVote Page] load choice vote success',
    props<{ payload: GetAllChoiceVoteDtoDataRes[] }>()
)

const insertChoiceVoteAction = createAction(
    '[ChoiceVote Page] insert choice vote',
    props<{ payload: InsertChoiceVoteDtoReq }>()
)

const insertChoiceVoteSuccessAction = createAction(
    '[ChoiceVote Page] insert choice vote success',
    props<{ payload: GetByChoiceVoteIdDtoDataRes }>()
)

export {
    loadChoiceVoteAction, loadChoiceVoteSuccessAction, insertChoiceVoteAction, insertChoiceVoteSuccessAction
}