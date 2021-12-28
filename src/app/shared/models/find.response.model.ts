export interface FindResponse {
  planet_name: string;
  status: string;
}

export interface FindResult extends FindResponse {
  time_taken: number;
}
