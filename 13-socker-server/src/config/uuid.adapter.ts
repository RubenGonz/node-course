export class UuidAdapter {
  static get = () => crypto.randomUUID();
}
