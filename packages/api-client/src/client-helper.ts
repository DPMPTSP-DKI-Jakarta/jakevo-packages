import { JakevoApiError } from "./types/base";

export abstract class JakevoApiClientHelper {

  protected _resolveError(err: any) {
    let error: JakevoApiError = {
      message: null,
      name: null,
      description: null,
      status: null,
      hint: null
    }

    if (err.code === 'ENOTFOUND' || err.syscall === 'getaddrinfo') {
      error.status = err.code;
      error.message = `The given url ${err.config.baseURL} is incorrect or invalid `;
      error.name = err.syscall;
    } else {
      if (err.response.data.error) {
        error.status = err.response.status
        error.message = err.response.data.message
        error.name = err.response.data.error
        error.description = err.response.data.error_description
        error.hint = err.response.data.hint
      } else {
        error = {
          ...err.response.data,
          status: err.response.status
        }
      }
    }

    const response = {
      data: null,
      error
    }

    return response;
  }

  protected _resolveSuccess(data: any) {
    return data.data
  }
}
