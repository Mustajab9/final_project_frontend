export class GetUserByEmailDtoDataRes {
	id!: string
	username!: string
	password?: string
	verificationCode!: string
	roleId!: string
	roleName?: string
	version?: number
	isActive?: boolean
}

