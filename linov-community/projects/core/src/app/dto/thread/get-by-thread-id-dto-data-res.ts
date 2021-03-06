import { GetThreadPollingChoiceDtoRes } from "./get-thread-polling-choice-dto-res"

export class GetByThreadIdDtoDataRes {
	id!: string
	threadCode!: string
	threadTitle!: string
	threadContent!: string
	typeCode!: string
	typeName!: string
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
	isLiked!: boolean
	isBookmarked!: boolean
	isVoted!: boolean
	profileName!: string
	profileImage!: string
	version!: number
	isActive!: boolean
}

