export class UpdateUserDtoReq {
	id!: string
	email!: string
	password?: string
	roleId!: string
	version?: number
	isActive?: boolean
}

