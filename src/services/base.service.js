import { Http, ResponseWrapper, ApiError } from './http';

export class BaseService {
  static get resourceEndpoint() {
    throw new Error('resource endpoint not defined');
  }

  static request() {
    return new Http();
  }

  static async index(parameters = {}) {
    const params = { ...parameters };

    try {
      const response = await this.request().get(
        `${this.resourceEndpoint}`,
        { params }
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }

  static async get(id) {
    try {
      const response = await this.request().get(
        `${this.resourceEndpoint}/${id}`
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }

  static async create(data = {}) {
    try {
      const response = await this.request().post(
        `${this.resourceEndpoint}`,
        data
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }

  static async update(id, data = {}) {
    try {
      const response = await this.request().patch(
        `${this.resourceEndpoint}/${id || ''}`,
        data
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }

  static async delete(id) {
    try {
      const response = await this.request().delete(
        `${this.resourceEndpoint}/${id}`
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }

  static async agreeRevision(id, data = {}) {
    try {
      const response = await this.request().patch(
        `${this.resourceEndpoint}/agree_revision/${id || ''}`,
        data
      );
      return new ResponseWrapper(response);
    } catch (error) {      throw new ApiError(error);
    }
  }
}
