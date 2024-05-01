import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    type: String,
    example: 'isamoura@gmail.com',
    required: true,
    description: `User's email for login.`,
  })
  email: string;

  @ApiProperty({
    type: String,
    example: 'hamster',
    required: true,
    description: `User's password for login.`,
  })
  password: string;
}
