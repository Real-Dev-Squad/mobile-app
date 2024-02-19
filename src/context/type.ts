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

export interface InputBoxProps {
  label: string;
  title: string;
  onChangeHandler: (text: string) => void;
  error: string;
}
