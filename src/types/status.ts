import { ValuesOf } from '../utils/typeUtils'

export const Status = {
  Ok: 200,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
} as const

export type Status = ValuesOf<typeof Status>
