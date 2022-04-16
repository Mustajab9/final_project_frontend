import { GetThreadPollingChoiceDtoRes } from "./get-thread-polling-choice-dto-res"

export class GetAllThreadDtoDataRes {
	id!: string
	threadCode!: string
	threadTitle!: string
	threadContent!: string
	typeCode!: string
	categoryId!: string[]
	categoryName!: string[]
	attachmentId!: string[]
	attachemntExtension?: string[]
	pollingName!: string
	choices!: GetThreadPollingChoiceDtoRes[]
	countVote!: number[]
	totalVote!: number
	totalLike!: number
	totalComment!: number
	isPremium!: boolean
	isLiked!: boolean
	isBookmarked!: boolean
	isVoted!: boolean
	profileName!: string
	profileImage!: string
	isReadMore: boolean = true
	version!: number
	isActive!: boolean
}

