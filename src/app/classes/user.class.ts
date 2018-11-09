export class User {
  public login: string;
  public password: string;

  constructor(user: any) {
    this.login = user.login;
    this.password = user.password;
  }
}
