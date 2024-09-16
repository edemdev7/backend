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
exports.WidgetController = void 0;
const common_1 = require("@nestjs/common");
const widget_service_1 = require("./widget.service");
const create_widget_dto_1 = require("./dto/create-widget.dto");
const update_widget_dto_1 = require("./dto/update-widget.dto");
let WidgetController = class WidgetController {
    constructor(widgetService) {
        this.widgetService = widgetService;
    }
    create(createWidgetDto) {
        return this.widgetService.create(createWidgetDto);
    }
    findAll() {
        return this.widgetService.findAll();
    }
    findOne(id) {
        return this.widgetService.findOne(id);
    }
    update(id, updateWidgetDto) {
        return this.widgetService.update(id, updateWidgetDto);
    }
    remove(id) {
        return this.widgetService.remove(id);
    }
};
exports.WidgetController = WidgetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_widget_dto_1.CreateWidgetDto]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_widget_dto_1.UpdateWidgetDto]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WidgetController.prototype, "remove", null);
exports.WidgetController = WidgetController = __decorate([
    (0, common_1.Controller)('widgets'),
    __metadata("design:paramtypes", [widget_service_1.WidgetService])
], WidgetController);
//# sourceMappingURL=widget.controller.js.map