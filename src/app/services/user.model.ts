// import {Deserializable} from './deserializable.model';

export class User {
// export class User implements Deserializable {
  public id: number;
  public userName: string;
  public fullName: string;
  public email: string;
  public avatarUrl: string;

  constructor(res: any) {
    this.id = res.id;
    this.userName = res.user_name;
    this.fullName = res.full_name;
    this.email = res.email;
    this.avatarUrl = res.avatar_url;
  }
}

export class Login {
  public token: string;
  public user: User;

  constructor(res: any) {
    this.token = res.token;
    this.user = res.user;
  }
}

export class LoginForm {
  public email: string;
  public password: string;
}