export class GetAllEventDtoDataRes {
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
	priceId!: string
	priceName!: string
	attachmentId!: string
	attachmentExtension!: string
	paymentAttachment!: string
	paymentId!: string
	paymentName!: string
	enrollIsApprove!: boolean
	enrollInvoice!: string
	createdBy!: string
	version!: number
	isActive!: boolean
}

