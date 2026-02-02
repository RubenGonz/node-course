import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
import { EmailService } from './email.service';

export class AuthService {

  constructor(
    private readonly emailService: EmailService
  ) { }

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email })
    if (existUser) throw CustomError.badRequest("Email already exists")

    try {
      const user = new UserModel(registerUserDto)
      user.password = bcryptAdapter.hash(registerUserDto.password)
      await user.save()

      await this.sendEmailValidationLink(user.email)

      const { password, ...userEntity } = UserEntity.fromObject(user)

      const token = await JwtAdapter.generateToken({ id: user.id, email: user.email })
      if (!token) throw CustomError.internalServer("Error while creating JWT")

      return {
        user: userEntity,
        token: token,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email })
    if (!user) throw CustomError.badRequest("Email does not exist")

    const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password)
    if (!isMatching) throw CustomError.badRequest("Invalid password")

    const { password, ...userEntity } = UserEntity.fromObject(user)

    const token = await JwtAdapter.generateToken({ id: user.id, email: user.email })
    if (!token) throw CustomError.internalServer("Error while creating JWT")

    return {
      user: userEntity,
      token: token
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email })
    if (!token) throw CustomError.internalServer("Error getting JWT")

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`

    const html = `
      <h1>Email Validation</h1>
      <p>Click the link below to validate your email:</p>
      <a href="${link}">${email}</a>
    `
    const options = {
      to: email,
      subject: "Email Validation",
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options)
    if (!isSent) throw CustomError.internalServer("Error sending email")

    return true
  }

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token)
    if (!payload) throw CustomError.unauthorized("Invalid token")

    const { email } = payload as { email: string }
    if (!email) throw CustomError.unauthorized("Token has no email")

    const user = await UserModel.findOne({ email })
    if (!user) throw CustomError.internalServer("Email does not exist")

    return true
  }
}