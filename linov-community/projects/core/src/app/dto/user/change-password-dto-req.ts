export class ChangePasswordDtoReq {
	id!: string
	email!: string
	password?: string
	newPassword?: string
	roleId!: string
	version?: number
	isActive?: boolean
}

