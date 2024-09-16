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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const mail_service_1 = require("./mail.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, mailService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signUp(signUpDto, res) {
        try {
            const { username, email, password } = signUpDto;
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                throw new common_1.ConflictException('Email already exists');
            }
            const hashed_password = await bcrypt.hash(password, 10);
            const verificationCode = this.generateVerificationCode();
            const user = await this.userModel.create({
                username,
                email,
                password: hashed_password,
                verificationCode,
                isVerified: false,
                is_admin: false,
            });
            const token = this.jwtService.sign({ id: user._id, email: user.email });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 3600000,
                sameSite: 'none'
            });
            this.mailService.sendMail(user.verificationCode, user.username, 'atirichardessotina@gmail.com', user.email);
            res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        is_admin: user.is_admin,
                        verificationCode,
                    },
                },
            });
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async login(loginDto, res) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentiels');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user._id });
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: 'none'
        });
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    is_admin: user.is_admin
                }
            }
        });
    }
    async verify_account(id, verificationCode) {
        const verifyUser = await this.userModel.findById(id);
        if (!verifyUser) {
            throw new common_1.NotFoundException(`User with ID: ${id} not found`);
        }
        if (verifyUser.verificationCode !== verificationCode) {
            throw new common_1.UnauthorizedException('Invalid verification code');
        }
        verifyUser.isVerified = true;
        verifyUser.verificationCode = null;
        await verifyUser.save();
        return {
            status: 'success',
            message: 'User verified successfully',
            data: {
                id: verifyUser._id,
                username: verifyUser.username,
                email: verifyUser.email,
                isVerified: verifyUser.isVerified,
            },
        };
    }
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async validateUserByGoogle(user) {
        const { email } = user;
        let existingUser = await this.userModel.findOne({ email });
        if (!existingUser) {
            existingUser = await this.userModel.create({
                username: user.firstName + ' ' + user.lastName,
                email: user.email,
                isVerified: true,
            });
        }
        const token = this.jwtService.sign({ id: existingUser._id });
        return {
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        };
    }
    async forget_password(email) {
        const reset_password_code = this.generateVerificationCode();
        const userReset = await this.userModel.findOneAndUpdate({ email: email }, { verificationCode: reset_password_code });
        if (!userReset) {
            throw new common_1.NotFoundException('USer not found !');
        }
        const send_email = this.mailService.sendResetCode(reset_password_code, 'richard.ati@epitech.eu', email, userReset.username);
        return {
            status: 'success',
            message: 'User verify successfuly !',
            data: {
                email: email,
                username: userReset.username,
                confirmCode: reset_password_code,
            },
        };
    }
    async reset_new_password(confirmationCode, email, newPassword) {
        const userReset = await this.userModel.findOne({ email });
        if (!userReset) {
            throw new common_1.NotFoundException('User not found !');
        }
        if (userReset.verificationCode != confirmationCode) {
            throw new common_1.UnauthorizedException('Not authorizided to set new password');
        }
        const hashed_password = await bcrypt.hash(newPassword, 10);
        await this.userModel.updateOne({ email: email }, { $set: { password: hashed_password } });
        await this.userModel.updateOne({ email: email }, { $set: { verificationCode: null } });
        return {
            status: 'Success',
            message: 'Password Reset successfuly',
            data: {
                email: email,
                password: hashed_password,
            },
        };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.signUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signUp", null);
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.loginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "login", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map