import api from "../../common/config/api";

export interface RegisterBody {
  companyName: string;
  internalCode: number;
  tributaryId?: string;
  apiCalls: number,
  currency?: string;
  banks: number[]
}

const register = (body: RegisterBody) => api.post('/v1/registration', body)

export {
  register
}