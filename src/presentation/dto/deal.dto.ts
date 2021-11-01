import { IsValidISODate } from '../validator/is.valid.iso.date.validator';

export class FindDealsByDateDTO {
  @IsValidISODate()
  date: string;
}
