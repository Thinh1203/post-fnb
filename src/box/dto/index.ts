import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { boxStatus } from 'src/utils/enums';

export class CreateBoxDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsEnum(Object.values(boxStatus))
  status: boxStatus;
  @IsNotEmpty()
  @IsNumber()
  number_of_people: number;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  qr_code: string;
  @IsNotEmpty()
  @IsString()
  type_id: string;
}

export class UpdateBoxStatusDto {
  @IsNotEmpty()
  @IsEnum(Object.values(boxStatus), {
    message: `status phải là một trong các giá trị sau: ${Object.values(boxStatus).join(', ')}`,
  })
  status: boxStatus;
}
