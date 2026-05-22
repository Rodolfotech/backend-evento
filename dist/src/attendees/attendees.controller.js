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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const attendees_service_1 = require("./attendees.service");
const dto_1 = require("../common/dto");
let AttendeesController = class AttendeesController {
    attendeesService;
    constructor(attendeesService) {
        this.attendeesService = attendeesService;
    }
    register(body) {
        return this.attendeesService.register(body.userId, body.eventId);
    }
    findByEvent(eventId) {
        return this.attendeesService.findByEvent(eventId);
    }
    findByUser(userId) {
        return this.attendeesService.findByUser(userId);
    }
};
exports.AttendeesController = AttendeesController;
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Registrarse a un evento' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterAttendeeDto]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('event/:eventId'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar asistentes de un evento' }),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "findByEvent", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar eventos de un usuario' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "findByUser", null);
exports.AttendeesController = AttendeesController = __decorate([
    (0, swagger_1.ApiTags)('Attendees'),
    (0, common_1.Controller)('attendees'),
    __metadata("design:paramtypes", [attendees_service_1.AttendeesService])
], AttendeesController);
//# sourceMappingURL=attendees.controller.js.map