import api from "../../common/config/api";

export interface UpdateUserBody {
  tributaryId?: string;
  currency?: string;
}

const fetchUser = (userId: string) => api.get(`/v1/users/${userId}`)
const updateUser = (userId: string, body: UpdateUserBody) => api.patch(`/v1/users/${userId}`, body)

export {
  fetchUser,
  updateUser
}