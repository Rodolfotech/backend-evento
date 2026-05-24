import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class CreateEventDto {
  @ApiProperty({ example: 'Concierto Rock 2026' })
  title: string;

  @ApiProperty({ example: 'concierto-rock-2026' })
  slug: string;

  @ApiProperty({ example: 'El mejor concierto del año' })
  description: string;

  @ApiProperty({ example: '2026-06-15T20:00:00Z' })
  date: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty({ required: false })
  categoryId?: string;

  @ApiProperty({ required: false, example: 'Estadio Nacional' })
  locationName?: string;

  @ApiProperty({ required: false, example: 'Av. Grecia 2001' })
  address?: string;

  @ApiProperty({ required: false, example: 'Santiago' })
  city?: string;

  @ApiProperty({ required: false, default: false })
  isOnline?: boolean;
}

export class UpdateEventDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  date?: string;

  @ApiProperty({ required: false })
  locationName?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  city?: string;

  @ApiProperty({ required: false })
  isOnline?: boolean;
}

export class CreateCategoryDto {
  @ApiProperty({ example: 'Música' })
  name: string;

  @ApiProperty({ required: false, example: 'Eventos musicales' })
  description?: string;
}

export class RegisterAttendeeDto {
  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  eventId: string;
}

export class ConnectSocialDto {
  @ApiProperty({ example: 'instagram' })
  platform: string;

  @ApiProperty({ example: 'EAA...' })
  accessToken: string;
}
