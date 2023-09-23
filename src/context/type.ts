export type loggedInUserType = {
  id: string;
  name: string;
  profileUrl: string;
  status: string;
};

export interface User {
  name: string;
  profileUrl: string;
  userName: string;
  designation: string;
  company: string;
  linkedInUrl: string;
  twitterUrl: string;
  githubUrl: string;
}

export interface ErrorData {
  isError: boolean;
  errorMessage: string;
}
