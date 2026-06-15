import { ApiProperty, ApiBody } from '@nestjs/swagger';

// --- Auth ---

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

// --- Events ---

export class CreateEventDto {
  @ApiProperty({ example: 'Concierto Rock 2026' })
  title: string;

  @ApiProperty({ required: false, example: 'concierto-rock-2026' })
  slug?: string;

  @ApiProperty({ example: 'El mejor concierto del año' })
  description: string;

  @ApiProperty({ example: '2026-06-15T20:00:00Z' })
  date: string;

  @ApiProperty({ required: false })
  ownerId?: string;

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

  @ApiProperty({ required: false, example: '2026-06-01T00:00:00Z' })
  publicationStartDate?: string;

  @ApiProperty({ required: false, example: '2026-06-30T23:59:59Z' })
  publicationEndDate?: string;

  @ApiProperty({ required: false, example: 'Música' })
  categoryName?: string;

  @ApiProperty({ required: false, example: '17854321098765432' })
  instagramMediaId?: string;
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

  @ApiProperty({ required: false })
  publicationStartDate?: string;

  @ApiProperty({ required: false })
  publicationEndDate?: string;

  @ApiProperty({ required: false })
  categoryName?: string;
}

// --- Categories ---

export class CreateCategoryDto {
  @ApiProperty({ example: 'Música' })
  name: string;

  @ApiProperty({ required: false, example: 'Eventos musicales' })
  description?: string;
}

// --- Attendees ---

export class RegisterAttendeeDto {
  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty()
  eventId: string;
}

// --- Social ---

export class ConnectSocialDto {
  @ApiProperty({ example: 'instagram' })
  platform: string;

  @ApiProperty({ example: 'EAA...' })
  accessToken: string;
}
