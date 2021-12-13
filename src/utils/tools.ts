export class Tools {
  static generateValidationCode(length: number): number {
    let res = '';
    for (let i = 1; i <= length; i++) {
      const round = Math.floor(Math.random() * 10);
      console.log(round);
      res = res + round;
    }
    return parseInt(res);
  }

  // param example : 10s , 20h, 30s
  static getExpireFromNow(expireTime: string): Date {
    const period = expireTime.substr(expireTime.length - 1);
    let dis = expireTime.substr(0, expireTime.length - 1);
    let longTime = 0;
    switch (period) {
      default:
      case 's':
        longTime = 1000;
        dis = expireTime;
        break;
      case 'm':
        longTime = 1000 * 60;
        break;
      case 'h':
        longTime = 1000 * 60 * 60;
        break;
    }

    return new Date(new Date().getTime() + longTime * parseInt(dis));
  }
}
