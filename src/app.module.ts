import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';
import { AttendeesModule } from './attendees/attendees.module';
import { SeedModule } from './seed/seed.module';
import { SocialModule } from './social/social.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';
import { ADMIN_API_PREFIX } from './admin/admin.constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 20,
    }]),
    RouterModule.register([
      {
        path: ADMIN_API_PREFIX,
        module: AdminModule,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    EventsModule,
    CategoriesModule,
    AttendeesModule,
    SeedModule,
    SocialModule,
    MailModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
