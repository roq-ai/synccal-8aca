import axios from 'axios';
import queryString from 'query-string';
import { ContentCategoryInterface, ContentCategoryGetQueryInterface } from 'interfaces/content-category';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getContentCategories = async (
  query?: ContentCategoryGetQueryInterface,
): Promise<PaginatedInterface<ContentCategoryInterface>> => {
  const response = await axios.get('/api/content-categories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createContentCategory = async (contentCategory: ContentCategoryInterface) => {
  const response = await axios.post('/api/content-categories', contentCategory);
  return response.data;
};

export const updateContentCategoryById = async (id: string, contentCategory: ContentCategoryInterface) => {
  const response = await axios.put(`/api/content-categories/${id}`, contentCategory);
  return response.data;
};

export const getContentCategoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContentCategoryById = async (id: string) => {
  const response = await axios.delete(`/api/content-categories/${id}`);
  return response.data;
};
