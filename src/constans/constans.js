export const APP_ID = "22482503e22d9217";
export const APP_REGION = "us";
export const AUTH_KEY = "19fd903aca95a6a5d5d4cc3baa45e48c04172840";

export const FILTER_GENDER_OPTIONS = [
  { value: "", display: "All" },
  { value: "male", display: "Male" },
  { value: "female", display: "Female" },
];

export const FILTER_STATUS_OPTIONS = [
  { value: "", display: "All" },
  { value: "true", display: "Active" },
  { value: "false", display: "Banned" },
];

export const USER_TABLE_HEAD = [
  { id: "fullname", label: "Fullname", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "location", label: "Location", alignRight: false },
  { id: "major", label: "Major", alignRight: false },
  //{ id: "is_admin", label: "Role", alignRight: false },
  { id: "is_active", label: "Status", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];