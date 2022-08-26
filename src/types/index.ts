export interface ITask {
  id: string;
  title: string;
  deadline: string;
  status: string;
  assignee: string[];
  description?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface IOrganization {
  id: string;
  organizationName: string;
  phoneNumber: string;
  address: string;
  userName: string;
  email: string;
  password: string;
}
