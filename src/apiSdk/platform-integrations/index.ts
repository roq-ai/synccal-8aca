import axios from 'axios';
import queryString from 'query-string';
import { PlatformIntegrationInterface, PlatformIntegrationGetQueryInterface } from 'interfaces/platform-integration';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPlatformIntegrations = async (
  query?: PlatformIntegrationGetQueryInterface,
): Promise<PaginatedInterface<PlatformIntegrationInterface>> => {
  const response = await axios.get('/api/platform-integrations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPlatformIntegration = async (platformIntegration: PlatformIntegrationInterface) => {
  const response = await axios.post('/api/platform-integrations', platformIntegration);
  return response.data;
};

export const updatePlatformIntegrationById = async (id: string, platformIntegration: PlatformIntegrationInterface) => {
  const response = await axios.put(`/api/platform-integrations/${id}`, platformIntegration);
  return response.data;
};

export const getPlatformIntegrationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/platform-integrations/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deletePlatformIntegrationById = async (id: string) => {
  const response = await axios.delete(`/api/platform-integrations/${id}`);
  return response.data;
};
