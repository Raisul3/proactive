import { validationResult } from 'express-validator'
import { ApiError } from '../utils/ApiError.js'

// Runs after express-validator rules on a route; throws a 422 with field
// errors if any rule failed.
export function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ApiError(422, 'Validation failed', errors.array())
  }
  next()
}
