export class ApiError<T> {
  success: boolean;
  data: null;
  error: string;

  constructor(error: string) {
    this.success = false;
    this.data = null;
    this.error = error;
  }
}
