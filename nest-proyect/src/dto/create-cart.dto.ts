import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly timestamp: number;

  @ApiProperty()
  readonly products: string;
}
