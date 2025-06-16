export interface UserDTORequest {
  id?: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  phone?: string;
  email?: string;
  fullName?: string;
}
