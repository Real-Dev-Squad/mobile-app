export type loggedInUserType = {
  id: string;
  name: string;
  profileUrl: string;
  status: string;
  token: string;
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

export type UserInfoType = {
  created_at: number;
  discordId: string;
  first_name: string;
  github_created_at: number;
  github_display_name: null;
  github_id: string;
  github_user_id: string;
  id: string;
  incompleteUserDetails: boolean;
  last_name: string;
  picture: PictureType;
  roles: { archived: boolean; in_discord: boolean };
  updated_at: number;
  username: string;
};
export type PictureType = {
  publicId: string;
  url: string;
};
export interface InputBoxProps {
  label: string;
  title: string;
  onChangeHandler: (text: string) => void;
  error: string;
  disabled: boolean;
}
