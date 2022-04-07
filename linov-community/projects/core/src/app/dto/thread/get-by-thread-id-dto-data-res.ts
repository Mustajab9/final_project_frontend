export class GetByThreadIdDtoDataRes { 
	 id!: string 
	 threadCode!: string 
	 threadTitle!: string 
	 threadContent!: string 
	 categoryId!: string[] 
	 categoryName!: string[] 
	 attachmentId?: string[] 
	 attachemntExtension?: string[] 
	 pollingName!: string 
	 choiceName!: string[] 
	 countVote?: number[] 
	 totalVote?: number 
	 version!: number 
	 isActive!: boolean 
} 

