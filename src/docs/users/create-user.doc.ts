import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../utils/user-role.enum';

export class CreateUserDoc {
  @ApiProperty({
    type: String,
    example: 'Isa',
    required: true,
    description: `User's first name.`,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'isa@gmail.com',
    required: true,
    description: `User's email for login.`,
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'hamster',
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
