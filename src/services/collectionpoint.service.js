import http from '../http-common';

class CollectionPointService {
  getAll() {
    return http.get('/collectionPoint');
  }

  get(id) {
    return http.get(`/collectionPoint/${id}`);
  }

  create(data) {
    return http.post('/collectionPoint', data);
  }

  update(id, data) {
    return http.put(`/collectionPoint/${id}`, data);
  }

  delete(id) {
    return http.delete(`/collectionPoint/${id}`);
  }
}

export default new CollectionPointService();
