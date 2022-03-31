import { BigInteger } from './big-integer' 

export class UpdatePriceListMemberDtoReq { 
	 id?: string 
	 priceNominal?: BigInteger 
	 duration?: number 
	 version?: number 
	 isActive?: boolean 
} 

