export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;

  constructor(user: any) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.fullName = user.full_name;
    this.avatarUrl = user.avatar_url;
  }
}
