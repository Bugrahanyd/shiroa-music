import { IsMongoId } from "class-validator";

export class CreateCheckoutDto {
  @IsMongoId()
  trackId: string;
}
