import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MEDIA_STORAGE, MediaStorage } from './storage/media-storage';
import { LocalMediaStorage } from './storage/local-media-storage';
import { SupabaseMediaStorage } from './storage/supabase-media-storage';

@Module({
  controllers: [MediaController],
  providers: [
    MediaService,
    LocalMediaStorage,
    SupabaseMediaStorage,
    {
      // STORAGE_DRIVER=local en desarrollo; por defecto Supabase (producción).
      provide: MEDIA_STORAGE,
      inject: [ConfigService, LocalMediaStorage, SupabaseMediaStorage],
      useFactory: (
        config: ConfigService,
        local: LocalMediaStorage,
        supabase: SupabaseMediaStorage,
      ): MediaStorage => (config.get('STORAGE_DRIVER') === 'local' ? local : supabase),
    },
  ],
  exports: [MEDIA_STORAGE],
})
export class MediaModule {}
