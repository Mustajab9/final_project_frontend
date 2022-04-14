export class GetEventByCategoryDtoDataRes {
	id!: string
	eventCode!: string
	eventTitle!: string
	eventProvider!: string
	eventLocation!: string
	eventPrice!: number
	eventTimeStart!: string | null
	eventTimeEnd!: string | null
	eventDateStart!: string | null
	eventDateEnd!: string | null
	isApprove!: boolean
	categoryId!: string
	categoryName!: string
	typeId!: string
	typeName!: string
	attachmentId!: string
	attachmentExtension!: string
	isEnroll!: boolean
	createdBy!: string
	version!: number
	isActive!: boolean
}

