import { BigInteger } from './big-integer' 

export class GetByEventIdDtoDataRes { 
	 id?: string 
	 eventCode?: string 
	 eventTitle?: string 
	 eventProvider?: string 
	 eventPrice?: BigInteger 
	 eventTimeStart?: string 
	 eventTimeEnd?: string 
	 eventDateStart?: string 
	 eventDateEnd?: string 
	 isApprove?: boolean 
	 categoryId?: string 
	 categoryName?: string 
	 typeId?: string 
	 typeName?: string 
	 priceId?: string 
	 priceName?: string 
	 attachmentId?: string 
	 attachmentExtension?: string 
	 version?: number 
	 isActive?: boolean 
} 

