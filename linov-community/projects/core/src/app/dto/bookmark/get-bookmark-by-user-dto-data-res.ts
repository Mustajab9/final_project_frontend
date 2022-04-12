import { GetThreadPollingChoiceDtoRes } from "../thread/get-thread-polling-choice-dto-res"

export class GetBookmarkByUserDtoDataRes {
	id!: string
	bookmarkCode!: string
	threadId!: string
	threadTitle!: string
	threadContent!: string
	typeCode!: string
	categoryId!: string[]
	categoryName!: String[]
	attachmentId!: string[]
	attachemntExtension!: string[]
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

