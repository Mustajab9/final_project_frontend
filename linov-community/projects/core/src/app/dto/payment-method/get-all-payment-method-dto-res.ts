import { GetAllPaymentMethodDtoDataRes } from './get-all-payment-method-dto-data-res'

export class GetAllPaymentMethodDtoRes {
	msg?: string
	data!: GetAllPaymentMethodDtoDataRes[]
	total!: number
}

