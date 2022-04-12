export class InsertEventDtoReq {
	eventTitle!: string
	eventProvider!: string
	eventLocation!: string
	eventPrice!: number
	eventTimeStart!: string | null
	eventTimeEnd!: string | null
	eventDateStart!: string | null
	eventDateEnd!: string | null
	eventTypeId!: string
	categoryId!: string
}

