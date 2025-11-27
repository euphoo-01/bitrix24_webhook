export interface Company {
	ID: string;
	TITLE: string;
	PHONE?: { VALUE: string }[];
	EMAIL?: { VALUE: string }[];
	ASSIGNED_BY_ID: string;
}

export interface BitrixResponse<T> {
	result: T;
	total: number;
	next?: number;
	time: {
		start: number;
		finish: number;
		duration: number;
		processing: 0;
		date_start: Date;
		date_finish: Date;
		operating_reset_at: number;
		operating: number;
	};
}
