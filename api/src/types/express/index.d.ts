import { LoggedUser } from '../../authenticateToken'

export {}
export type { LoggedUser }

declare global {
  namespace Express {
    export interface Request {
      user?: LoggedUser
    }
  }
}
