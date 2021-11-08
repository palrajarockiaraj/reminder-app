export default class AppUtil {
  static leftFillNum = (num: number = 0, targetLength: number = 2) =>
    num.toString().padStart(targetLength, "0");
}
