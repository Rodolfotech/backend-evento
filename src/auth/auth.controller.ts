import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../common/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({ type: RegisterDto })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Solicitar recuperación de contraseña' })
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restablecer contraseña con token' })
  resetPasswordWithToken(@Body('token') token: string, @Body('password') password: string) {
    return this.authService.resetPasswordWithToken(token, password);
  }

  @Post('check-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verificar si un email existe' })
  checkEmail(@Body('email') email: string) {
    return this.authService.checkEmail(email);
  }

  @Post('reset-password-direct')
  @HttpCode(200)
  @ApiOperation({ summary: 'Restablecer contraseña directamente (solo desarrollo)' })
  resetPasswordDirect(@Body() body: LoginDto) {
    return this.authService.resetPassword(body.email, body.password);
  }
}
