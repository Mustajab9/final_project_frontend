import { BigInteger } from './big-integer' 

export class InsertEventDtoReq { 
	 eventTitle?: string 
	 eventProvider?: string 
	 eventPrice?: BigInteger 
	 eventTimeStart?: string 
	 eventTimeEnd?: string 
	 eventDateStart?: string 
	 eventDateEnd?: string 
	 eventTypeId?: string 
	 categoryId?: string 
	 priceId?: string 
} 

