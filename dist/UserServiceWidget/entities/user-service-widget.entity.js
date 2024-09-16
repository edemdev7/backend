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
exports.UserServiceWidgetSchema = exports.UserServiceWidget = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserServiceWidget = class UserServiceWidget extends mongoose_2.Document {
};
exports.UserServiceWidget = UserServiceWidget;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserServiceWidget.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Service' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], UserServiceWidget.prototype, "service", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Widget' }]),
    __metadata("design:type", Array)
], UserServiceWidget.prototype, "widgets", void 0);
exports.UserServiceWidget = UserServiceWidget = __decorate([
    (0, mongoose_1.Schema)()
], UserServiceWidget);
exports.UserServiceWidgetSchema = mongoose_1.SchemaFactory.createForClass(UserServiceWidget);
//# sourceMappingURL=user-service-widget.entity.js.map