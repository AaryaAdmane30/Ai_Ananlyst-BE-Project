import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Debugging: Agar abhi bhi error aaye toh terminal mein check karna kya print ho raha hai
    // console.log('Strategy Payload:', payload);

    if (!payload) {
      throw new UnauthorizedException();
    }

    // FIX: NextAuth ke liye payload.id ya payload.sub dono check karo
    return { 
      id: payload.id || payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}