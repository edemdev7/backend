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
exports.WidgetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const widget_entity_1 = require("./entities/widget.entity");
let WidgetService = class WidgetService {
    constructor(widgetModel) {
        this.widgetModel = widgetModel;
    }
    async create(createWidgetDto) {
        const newWidget = new this.widgetModel(createWidgetDto);
        return newWidget.save();
    }
    async findAll() {
        return this.widgetModel.find().populate('service').exec();
    }
    async findOne(id) {
        const widget = await this.widgetModel.findById(id).populate('service').exec();
        if (!widget) {
            throw new common_1.NotFoundException(`Widget with ID ${id} not found`);
        }
        return widget;
    }
    async update(id, updateWidgetDto) {
        const updatedWidget = await this.widgetModel
            .findByIdAndUpdate(id, updateWidgetDto, { new: true })
            .exec();
        if (!updatedWidget) {
            throw new common_1.NotFoundException(`Widget with ID ${id} not found`);
        }
        return updatedWidget;
    }
    async remove(id) {
        const result = await this.widgetModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Widget with ID ${id} not found`);
        }
    }
};
exports.WidgetService = WidgetService;
exports.WidgetService = WidgetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(widget_entity_1.Widget.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], WidgetService);
//# sourceMappingURL=widget.service.js.map