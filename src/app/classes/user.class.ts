export class User {
  public login: string;
  public password: string;
  public roleId: number;

  constructor(user: any) {
    this.login = user.login;
    this.password = user.password;
    this.roleId = user.roleId;
  }
}
