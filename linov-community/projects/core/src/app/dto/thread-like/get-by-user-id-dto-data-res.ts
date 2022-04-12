import { GetThreadPollingChoiceDtoRes } from "../thread/get-thread-polling-choice-dto-res"

export class GetByUserIdDtoDataRes {
	id!: string
	likeCode!: string
	threadId!: string
	threadTitle!: string
	threadContent!: string
	typeCode!: string
	categoryId!: String[]
	categoryName!: String[]
	attachmentId!: String[]
	attachemntExtension!: String[]
	pollingName!: string
	choices!: GetThreadPollingChoiceDtoRes[]
	countVote!: number[]
	totalVote!: number
	totalLike!: number
	totalComment!: number
	isLiked!: boolean
	isBookmarked!: boolean
	isVoted!: boolean
	isReadMore: boolean = true
	version!: number
	isActive!: boolean
}

