export class GetAllThreadDtoDataRes {
	id!: string
	threadCode!: string
	threadTitle!: string
	threadContent!: string
	typeCode!: string
	categoryId!: String[]
	categoryName!: String[]
	attachmentId!: String[]
	attachemntExtension?: String[]
	pollingName!: string
	choiceName!: String[]
	countVote!: number[]
	totalVote!: number
	totalLike!: number
	totalComment!: number
	isLiked!: boolean
	isBookmarked!: boolean
	isReadMore: boolean = true
	version!: number
	isActive!: boolean
}

