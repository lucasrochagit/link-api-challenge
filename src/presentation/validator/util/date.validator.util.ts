export class DateValidatorUtil {
  static isValidISODate(date: string): boolean {
    if (!date) return false;
    if (!/^(\d\d\d\d)-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[0,1])$/.test(date)) {
      return false;
    }
    const [year, month, day] = date.split('-');

    if (month === '02') {
      if (this.isLeapYear(+year)) {
        return +day <= 29;
      }
      return +day <= 28;
    }

    const monthsWithThirtyDays: string[] = ['04', '06', '09', '11'];

    if (monthsWithThirtyDays.includes(month)) {
      return +day <= 30;
    }

    return true;
  }

  private static isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }
}
