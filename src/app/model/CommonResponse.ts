export interface CommonResponse<T> {
  data: T,
  success: boolean,
  message: string
}