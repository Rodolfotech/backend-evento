import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsEmail, IsIn, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { COMUNAS } from './constants/comunas';
import { BUSINESS_AMENITIES, BUSINESS_CATEGORIES } from './constants/business';

// --- Auth ---

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'Hoy Se Sale Local' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  adminFirstName: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  adminLastName: string;

  @ApiProperty({ example: '+56912345678' })
  @Matches(/^\+569\d{8}$/, { message: 'El teléfono debe tener formato +569XXXXXXXX' })
  adminPhone: string;

  @ApiProperty({ example: 'Temuco', enum: COMUNAS })
  @IsIn(COMUNAS, { message: 'La comuna no pertenece a la Región de La Araucanía' })
  comuna: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}

// --- Media ---

export class LinkEventMediaDto {
  @ApiProperty({ example: 'https://www.instagram.com/p/XXXXXXXX/' })
  @IsUrl({ protocols: ['https'], require_protocol: true })
  permalink: string;

  @ApiProperty({ required: false, example: 'https://ejemplo.cl/imagen.jpg' })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  imageUrl?: string;

  @ApiProperty({ required: false, example: 'Noche de jazz en el patio' })
  @IsOptional()
  @IsString()
  @MaxLength(2200)
  caption?: string;
}

// --- Businesses ---


export class UpdateBusinessDto {
  @ApiProperty({ required: false, example: 'Cervecería del Sur' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name?: string;

  @ApiProperty({ required: false, enum: COMUNAS })
  @IsOptional()
  @IsIn(COMUNAS)
  comuna?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  companyAddress?: string;

  @ApiProperty({ required: false, example: '+56912345678' })
  @IsOptional()
  @Matches(/^\+569\d{8}$/, { message: 'El teléfono debe tener formato +569XXXXXXXX' })
  companyPhone?: string;

  @ApiProperty({ required: false, example: 'https://instagram.com/mi_local' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  companyInstagram?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  website?: string;

  @ApiProperty({ required: false, example: 'mi-local', description: 'Nueva URL de la página (hoysesale.cl/<slug>)' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  slug?: string;

  @ApiProperty({ required: false, enum: BUSINESS_CATEGORIES })
  @IsOptional()
  @IsIn(BUSINESS_CATEGORIES)
  category?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  logoUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  coverUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  businessDescription?: string;

  // Horarios por día, p. ej. { "lunes": "12:00-23:00", "domingo": "cerrado" }
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  hours?: Record<string, string>;

  @ApiProperty({ required: false, enum: BUSINESS_AMENITIES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(BUSINESS_AMENITIES.length)
  @IsIn(BUSINESS_AMENITIES, { each: true })
  amenities?: string[];

  @ApiProperty({ required: false, example: '+56912345678' })
  @IsOptional()
  @Matches(/^\+569\d{8}$/, { message: 'El WhatsApp debe tener formato +569XXXXXXXX' })
  whatsappReservations?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  mapUrl?: string;
}

export class CreateBusinessPageDto extends UpdateBusinessDto {}

// Productos, servicios y destacados del negocio (un solo DTO; cada tipo usa sus campos)
export class BusinessItemDto {
  @ApiProperty({ required: false, example: 'Café Etiopía Guji 340g', description: 'Producto: nombre. Servicio y destacado: usar title.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @ApiProperty({ required: false, example: 'Servicio de cafetería' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ required: false, example: 12900 })
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl({ protocols: ['https', 'http'], require_protocol: true })
  imageUrl?: string;

  @ApiProperty({ required: false, enum: ['MAS_VENDIDO', 'DEL_DIA', 'REGALO', 'NUEVO'] })
  @IsOptional()
  @IsIn(['MAS_VENDIDO', 'DEL_DIA', 'REGALO', 'NUEVO'])
  tag?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}

// Reseña de un visitante (una por usuario y negocio)
export class BusinessReviewDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
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
