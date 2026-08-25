export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;
    if (data !== undefined) {
      this.data = data;
    }
  }

  static success(res, data, statusCode = 200) {
    return res.status(statusCode).json(new ApiResponse(statusCode, data));
  }
}
