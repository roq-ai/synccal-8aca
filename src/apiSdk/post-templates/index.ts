import axios from 'axios';
import queryString from 'query-string';
import { PostTemplateInterface, PostTemplateGetQueryInterface } from 'interfaces/post-template';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPostTemplates = async (
  query?: PostTemplateGetQueryInterface,
): Promise<PaginatedInterface<PostTemplateInterface>> => {
  const response = await axios.get('/api/post-templates', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPostTemplate = async (postTemplate: PostTemplateInterface) => {
  const response = await axios.post('/api/post-templates', postTemplate);
  return response.data;
};

export const updatePostTemplateById = async (id: string, postTemplate: PostTemplateInterface) => {
  const response = await axios.put(`/api/post-templates/${id}`, postTemplate);
  return response.data;
};

export const getPostTemplateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/post-templates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePostTemplateById = async (id: string) => {
  const response = await axios.delete(`/api/post-templates/${id}`);
  return response.data;
};
