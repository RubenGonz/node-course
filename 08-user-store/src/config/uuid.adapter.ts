export class Uuid {
  static get = () => crypto.randomUUID();
};