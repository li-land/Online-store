export default interface IUser {
  id: number;
  name: string;
  email: string;
  roles: [{ id: number; value: string }];
}
