"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceWidgetModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_widget_service_1 = require("./user-service-widget.service");
const user_service_widget_controller_1 = require("./user-service-widget.controller");
const user_service_widget_entity_1 = require("./entities/user-service-widget.entity");
const widget_module_1 = require("../widgets/widget.module");
const widget_entity_1 = require("../widgets/entities/widget.entity");
const service_entity_1 = require("../services/entities/service.entity");
let UserServiceWidgetModule = class UserServiceWidgetModule {
};
exports.UserServiceWidgetModule = UserServiceWidgetModule;
exports.UserServiceWidgetModule = UserServiceWidgetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_service_widget_entity_1.UserServiceWidget.name, schema: user_service_widget_entity_1.UserServiceWidgetSchema },
                { name: widget_entity_1.Widget.name, schema: widget_entity_1.WidgetSchema },
                { name: service_entity_1.Service.name, schema: service_entity_1.ServiceSchema },
            ]),
            widget_module_1.WidgetModule,
        ],
        controllers: [user_service_widget_controller_1.UserServiceWidgetController],
        providers: [user_service_widget_service_1.UserServiceWidgetService],
    })
], UserServiceWidgetModule);
//# sourceMappingURL=user-service-widget.module.js.map