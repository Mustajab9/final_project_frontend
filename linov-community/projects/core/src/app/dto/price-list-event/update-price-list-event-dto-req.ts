import { BigInteger } from './big-integer' 

export class UpdatePriceListEventDtoReq { 
	 id?: string 
	 priceName?: string 
	 priceNominal?: BigInteger 
	 version?: number 
	 isActive?: boolean 
} 

