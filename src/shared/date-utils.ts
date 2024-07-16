export class DateUtils {
  static convertToDateTime(value: number) {
    const datetime = new Date(value * 1000);
    return (datetime.getHours() > 9 ? datetime.getHours() : "0" + datetime.getHours())
      + ":"
      + (datetime.getMinutes() > 9 ? datetime.getMinutes() : "0" + datetime.getMinutes());
  }
}
