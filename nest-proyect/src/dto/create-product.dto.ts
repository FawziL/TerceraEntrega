import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly thumbnail: string;

  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly stock: number;
}
