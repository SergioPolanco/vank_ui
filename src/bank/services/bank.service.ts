import api from '../../common/config/api';

const fetchBanks = () => api.get('/v1/banks');

export { fetchBanks };
