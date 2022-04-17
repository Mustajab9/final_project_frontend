export class UpdateProfilesDtoReq {
	id?: string
	profileName?: string
	profileCompany?: string
	industryId?: string
	positionId?: string
	regencyId?: string
	provinceId!: string
	version?: number
	isActive?: boolean
}

