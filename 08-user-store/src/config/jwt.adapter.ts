import jwt from "jsonwebtoken"
import { envs } from "./envs"

type Duration = number | `${number}${'S' | 'M' | 'H' | 'D'}`

const JWT_SEED = envs.JWT_SEED
export class JwtAdapter {

  static async generateToken(payload: any, duration: Duration = "2H") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null)
        resolve(token)
      })
    })
  }

  static validateToken(token: string) {
    throw new Error("Not implemented")
  }
}