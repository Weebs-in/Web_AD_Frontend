import http from '../http-common';

class MemberService {
  getAll() {
    return http.get('/member');
  }

  get(id) {
    return http.get(`/member/${id}`);
  }

  create(data) {
    return http.post('/member', data);
  }

  update(id, data) {
    return http.put(`/member/${id}`, data);
  }

  delete(id) {
    return http.delete(`/member/${id}`);
  }
}

export default new MemberService();
