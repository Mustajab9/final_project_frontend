export class GetThreadByCategoryDtoDataRes {
	id!: string
	threadCode!: string
	threadTitle!: string
	threadContent!: string
	categoryId!: string[]
	categoryName!: string[]
	attachmentId!: string[]
	attachemntExtension!: string[]
	pollingName!: string
	choiceName!: string[]
	countVote!: number[]
	totalVote!: number
	totalLike!: number
	totalComment!: number
	profileName!: string
	profileImage!: string
	version!: number
	isActive!: boolean
}

