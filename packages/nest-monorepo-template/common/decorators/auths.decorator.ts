import { SetMetadata } from '@nestjs/common';

export const Auths = (...auths: string[]) => SetMetadata('auths', auths);
