export const APP_ID = "22482503e22d9217";
export const APP_REGION = "us";
export const AUTH_KEY = "19fd903aca95a6a5d5d4cc3baa45e48c04172840";
export const SERVER = "https://social-media-api-moongo.herokuapp.com";

export const FILTER_GENDER_OPTIONS = [
  { value: "", display: "All" },
  { value: "male", display: "Male" },
  { value: "female", display: "Female" },
  { value: "prefer not to say", display: "Prefer not to say" },
];

export const FILTER_STATUS_OPTIONS = [
  { value: "", display: "All" },
  { value: "true", display: "Active" },
  { value: "false", display: "Banned" },
];

export const FILTER_REQUEST_STATUS_OPTIONS = [
  { value: "", display: "All" },
  { value: "true", display: "Proved" },
  { value: "false", display: "Not Proved" },
];

export const FILTER_DELETED_STATUS_OPTIONS = [
  { value: "", display: "All" },
  { value: "true", display: "Deleted" },
  { value: "false", display: "Not Deleted" },
];

export const FILTER_REPORT_STATUS_OPTIONS = [
  { value: "", display: "All" },
  { value: "true", display: "Done" },
  { value: "false", display: "Pending" },
];

export const FILTER_POST_TYPE_OPTIONS = [
  { value: "", display: "All" },
  { value: "question", display: "Question" },
  { value: "knowledge", display: "Knowledge" },
  { value: "source", display: "Source" },
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

export const REQUEST_TABLE_HEAD = [
  { id: "fullname", label: "User", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

export const POST_TABLE_HEAD = [
  { id: "content", label: "Content", alignRight: false },
  { id: "hashtag", label: "Hashtag", alignRight: false },
  { id: "createdBy", label: "Created By", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "like", label: "Like", alignRight: false },
  { id: "comment", label: "Comment", alignRight: false },
  { id: "createAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
];

export const COURSE_TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "description", label: "Description", alignRight: false },
  { id: "amount", label: "Question Amount", alignRight: false },
  { id: "createdBy", label: "Creator", alignRight: false },
  { id: "createdAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
  { id: "" },
];

export const GROUP_TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "admin", label: "Admin", alignRight: false },
  { id: "content", label: "Content", alignRight: false },
  { id: "is_deleted", label: "Status", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
];

export const EVENT_TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "date_time", label: "Organization Day", alignRight: false },
  { id: "user_joined", label: "Joiners", alignRight: false },
  { id: "createdBy", label: "Creator", alignRight: false },
  { id: "createdAt", label: "Created Day", alignRight: false },
  { id: "updatedAt", label: "Updated Day", alignRight: false },
  { id: "" },
];

export const REPORT_TABLE_HEAD = [
  { id: "content", label: "Content", alignRight: false },
  { id: "sent_by", label: "Reporter", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "createdAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
  { id: "" },
];

export const NOTI_TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "content", label: "Content", alignRight: false },
  { id: "creator", label: "Creator", alignRight: false },
  { id: "createAt", label: "Created At", alignRight: false },
  { id: "updatedAt", label: "Updated At", alignRight: false },
];
