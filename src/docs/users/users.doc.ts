import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDoc } from './create-user.doc';
import { UserRole } from '../../utils/user-role.enum';

export class UsersDoc extends CreateUserDoc {
  @ApiProperty({
    type: String,
    example: 'Fabim',
    required: true,
    description: `User's first name.`,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'fabim@gmail.com',
    required: true,
    description: `User's email for login.`,
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'inquebrável',
    required: true,
    description: `User's password.`,
  })
  password: string;

  @ApiProperty({
    type: UserRole,
    enum: UserRole,
    example: UserRole.BUYER,
    required: false,
    description: `User's role.`,
    default: UserRole.BUYER,
  })
  role?: UserRole;
}
