import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { MailService } from './mail.service';
import { Response } from 'express';  // Import du type Response d'Express

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }

  ///////////////////////////////////SING UP//////////////////////////////////////////
  //////////////////////////SIGN UP////////////////////////////////////////

 // Fonction d'inscription
 async signUp(signUpDto: signUpDto, @Res() res: Response): Promise<void> {
  try {
    const { username, email, password } = signUpDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashed_password = await bcrypt.hash(password, 10);
    const verificationCode = this.generateVerificationCode();

    const user = await this.userModel.create({
      username,
      email,
      password: hashed_password,
      verificationCode, // Ajout du code de vérification
      isVerified: false, // L'utilisateur doit être vérifié
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
          verificationCode, // Ajout pour vérification côté client si nécessaire
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictException('Email already exists');
    }
    throw error;
  }
}

  ///////////////////////////////////LOGIN//////////////////////////////////////////
  //////////////////////////LOGIN////////////////////////////////////////
  async login(
    loginDto: loginDto,
    @Res() res: Response
  ): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentiels');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
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
    })
  }

  ///////////////////////////////////ACCOUNT VERIFICATION//////////////////////////////////////////
  //////////////////////////ACCOUNT VERIFICATION////////////////////////////////////////
  async verify_account(
    id: string,
    verificationCode: string,
  ): Promise<{ status: string; message: string; data?: any }> {
    const verifyUser = await this.userModel.findById(id);

    if (!verifyUser) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }

    if (verifyUser.verificationCode !== verificationCode) {
      throw new UnauthorizedException('Invalid verification code');
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

  ///////////////////////////////////SING UP//////////////////////////////////////////
  //////////////////////////SIGN UP////////////////////////////////////////
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async validateUserByGoogle(user: any): Promise<any> {
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

  ///////////////////////////////////FORGET PASSWORD//////////////////////////////////////////
  //////////////////////////FORGET PASSWORD////////////////////////////////////////
  async forget_password(email: string) {
    const reset_password_code = this.generateVerificationCode();
    const userReset = await this.userModel.findOneAndUpdate(
      { email: email },
      { verificationCode: reset_password_code },
    );

    if (!userReset) {
      throw new NotFoundException('USer not found !');
    }

    const send_email = this.mailService.sendResetCode(
      reset_password_code,
      'richard.ati@epitech.eu',
      email,
      userReset.username,
    );

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

  ///////////////////////////////////RESET PASSWORD//////////////////////////////////////////
  //////////////////////////RESET PASSWORD////////////////////////////////////////
  async reset_new_password(confirmationCode, email, newPassword) {
    const userReset = await this.userModel.findOne({ email });

    if (!userReset) {
      throw new NotFoundException('User not found !');
    }

    if (userReset.verificationCode != confirmationCode) {
      throw new UnauthorizedException('Not authorizided to set new password');
    }

    const hashed_password = await bcrypt.hash(newPassword, 10);
    await this.userModel.updateOne(
      { email: email },
      { $set: { password: hashed_password } },
    );
    await this.userModel.updateOne(
      { email: email },
      { $set: { verificationCode: null } },
    );

    return {
      status: 'Success',
      message: 'Password Reset successfuly',
      data: {
        email: email,
        password: hashed_password,
      },
    };


  }
}

