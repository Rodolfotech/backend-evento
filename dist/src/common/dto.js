"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAttendeeDto = exports.CreateCategoryDto = exports.UpdateEventDto = exports.CreateEventDto = exports.RegisterDto = exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class RegisterDto {
    name;
    email;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Juan Pérez' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password123' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
class CreateEventDto {
    title;
    slug;
    description;
    date;
    ownerId;
    categoryId;
    locationName;
    address;
    city;
    isOnline;
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Concierto Rock 2026' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'concierto-rock-2026' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'El mejor concierto del año' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-06-15T20:00:00Z' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Estadio Nacional' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Av. Grecia 2001' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Santiago' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], CreateEventDto.prototype, "isOnline", void 0);
class UpdateEventDto {
    title;
    description;
    date;
    locationName;
    address;
    city;
    isOnline;
}
exports.UpdateEventDto = UpdateEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "locationName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateEventDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], UpdateEventDto.prototype, "isOnline", void 0);
class CreateCategoryDto {
    name;
    description;
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Música' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Eventos musicales' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
class RegisterAttendeeDto {
    userId;
    eventId;
}
exports.RegisterAttendeeDto = RegisterAttendeeDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RegisterAttendeeDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RegisterAttendeeDto.prototype, "eventId", void 0);
//# sourceMappingURL=dto.js.map