import { IsNotEmpty } from "class-validator";

export class CreateLinkDto {
  @IsNotEmpty()
  platform:string
  @IsNotEmpty()
  url:string
}
