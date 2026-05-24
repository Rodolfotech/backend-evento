import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { AttendeesModule } from './attendees/attendees.module';
import { SeedModule } from './seed/seed.module';
import { SocialModule } from './social/social.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EventsModule,
    CategoriesModule,
    AttendeesModule,
    SeedModule,
    SocialModule,
    MailModule,
  ],
})
export class AppModule {}
