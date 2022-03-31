import { BigInteger } from './big-integer' 

export class GetPaymentEventDetailByEventDtoDataRes { 
	 id?: string 
	 eventId?: string 
	 eventCode?: string 
	 eventTitle?: string 
	 eventProvider?: string 
	 eventPrice?: BigInteger 
	 eventTimeStart?: string 
	 eventTimeEnd?: string 
	 eventDateStart?: string 
	 eventDateEnd?: string 
	 isEventApprove?: boolean 
	 categoryId?: string 
	 categoryName?: string 
	 typeId?: string 
	 typeName?: string 
	 priceId?: string 
	 priceName?: string 
	 attachmentEventId?: string 
	 attachmentEventExtension?: string 
	 paymentEventId?: string 
	 paymentEventCode?: string 
	 paymentEventInvoice?: string 
	 ispaymentEventApprove?: boolean 
	 attachmentpaymentEventId?: string 
	 attachmentpaymentEventExtension?: string 
	 paymentId?: string 
	 paymentName?: string 
	 version?: number 
	 isActive?: boolean 
} 

