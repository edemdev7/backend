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
exports.UserServiceWidgetController = void 0;
const common_1 = require("@nestjs/common");
const user_service_widget_service_1 = require("./user-service-widget.service");
const create_user_service_widget_dto_1 = require("./dto/create-user-service-widget.dto");
let UserServiceWidgetController = class UserServiceWidgetController {
    constructor(userServiceWidgetService) {
        this.userServiceWidgetService = userServiceWidgetService;
    }
    async create(userId, createUserServiceWidgetDto) {
        console.log('Données reçues :', createUserServiceWidgetDto);
        const dataToSave = {
            ...createUserServiceWidgetDto,
            user: userId,
        };
        return this.userServiceWidgetService.create(dataToSave);
    }
    remove(userId, serviceId) {
        return this.userServiceWidgetService.remove(userId, serviceId);
    }
    findAll() {
        return this.userServiceWidgetService.findAll();
    }
};
exports.UserServiceWidgetController = UserServiceWidgetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_user_service_widget_dto_1.CreateUserServiceWidgetDto]),
    __metadata("design:returntype", Promise)
], UserServiceWidgetController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':serviceId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserServiceWidgetController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserServiceWidgetController.prototype, "findAll", null);
exports.UserServiceWidgetController = UserServiceWidgetController = __decorate([
    (0, common_1.Controller)('user-service-widgets'),
    __metadata("design:paramtypes", [user_service_widget_service_1.UserServiceWidgetService])
], UserServiceWidgetController);
//# sourceMappingURL=user-service-widget.controller.js.map