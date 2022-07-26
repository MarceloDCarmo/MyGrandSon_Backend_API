export class ValidationError extends Error {
    private _statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this._statusCode = statusCode

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    get statusCode() {
        return this._statusCode
    }
}