import { GetThreadPollingChoiceDtoRes } from "./get-thread-polling-choice-dto-res"

export class GetThreadByUserDtoDataRes {
	id!: string
	threadCode!: string
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
	profileName!: string
	profileImage!: string
	isReadMore: boolean = true
	version!: number
	isActive!: boolean
}

