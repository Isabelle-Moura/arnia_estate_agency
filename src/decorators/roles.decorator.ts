import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/utils/user-role.enum';

export const Roles = Reflector.createDecorator<UserRole[]>();
