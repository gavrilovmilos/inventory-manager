export class ErrorReport {
  private readonly _httpStatus: number;
  private readonly _code: string;
  private readonly _message: string;
  private readonly _details: unknown;

  constructor(httpStatus: number, code: string, message: string, details?: unknown) {
    this._httpStatus = httpStatus;
    this._code = code;
    this._message = message;
    this._details = details;
  }

  get code(): string {
    return this._code;
  }

  get message(): string {
    return this._message;
  }

  get httpStatus(): number {
    return this._httpStatus;
  }

  get body(): Record<string, string | unknown> {
    return { code: this.code, message: this.message, details: this._details };
  }

  public withDetails(details: unknown[]): ErrorReport {
    return new ErrorReport(this._httpStatus, this._code, this._message, details);
  }

  public withMessage(message: string): ErrorReport {
    return new ErrorReport(this._httpStatus, this._code, message, this._details);
  }
}

export const isErrorReport = (err: unknown): boolean => {
  if (err instanceof ErrorReport) {
    return true;
  }
  return false;
};
export const BAD_REQUEST = new ErrorReport(400, '12.4', 'Bad request');
export const NOT_FOUND = new ErrorReport(404, '12.4.4', 'Not found');export const INTERNAL_SERVER_ERROR = new ErrorReport(500, '12.5', 'Internal server error');
