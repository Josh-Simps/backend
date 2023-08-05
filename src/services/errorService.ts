import { Response } from 'express'
import { Status } from '../types/status'
import mongoose from 'mongoose'

export namespace ErrorService {
  export function handleError(res: Response, error: unknown) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(Status.BadRequest).json(error.message)
    }

    if (error instanceof Error) {
      return res.status(Status.InternalServerError).json(error.message)
    }

    res.status(Status.InternalServerError).json('Something went wrong sorry!')
  }
}
