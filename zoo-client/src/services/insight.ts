import { fetchApi } from './api';
import { IInsightContent, TInsights } from '@/types/insight/insightCard';
import { InsightDetailedProps } from '@/types/insight/insight';
import {
  InsightNoteListProps,
  MyInsightNoteListProps,
} from '@/types/insight/insightNote';

export async function fetchTopInsights() {
  const endpoint = '/api/v1/insights/top';
  const token =
    localStorage.getItem('noneMemberAccessToken') ||
    localStorage.getItem('accessToken');

  return fetchApi<IInsightContent[]>(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

interface ApiResponse<T> {
  data: T;
}

export async function fetchInsights(
  sort: string,
  page: number,
  eventDay?: string,
  sessionId?: number,
): Promise<TInsights> {
  let endpoint = `/api/v1/insights/list?&sort=${sort}&page=${page}`;
  const token =
    localStorage.getItem('noneMemberAccessToken') ||
    localStorage.getItem('accessToken');

  if (eventDay && sessionId) {
    endpoint = `/api/v1/insights/list?&sort=${sort}&page=${page}&eventDay=${eventDay}&sessionId=${sessionId}`;
  } else if (eventDay) {
    endpoint = `/api/v1/insights/list?&sort=${sort}&page=${page}&eventDay=${eventDay}`;
  } else if (sessionId) {
    endpoint = `/api/v1/insights/list?&sort=${sort}&page=${page}&sessionId=${sessionId}`;
  }

  const response: ApiResponse<TInsights> = await fetchApi(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getInsightNote(
  id: number,
  page: number,
  sort: string,
  size: number,
) {
  const endpoint = `/api/v1/sessions/${id}/insight-notes?sort=${sort}&page=${page}&size=${size}`;
  const token =
    localStorage.getItem('noneMemberAccessToken') ||
    localStorage.getItem('accessToken');

  return fetchApi<InsightNoteListProps>(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteInsight(id: number) {
  const endpoint = `/api/v1/insights/${id}`;
  return fetchApi(endpoint, {
    method: 'DELETE',
  });
}

export async function getInsightDetailed(id: number) {
  const endpoint = `/api/v1/insights/${id}`;
  return fetchApi<InsightDetailedProps>(endpoint, {
    method: 'GET',
  });
}

export async function getMyInsights({
  eventDay,
  page,
  size,
}: {
  eventDay?: string;
  page: number;
  size: number;
}) {
  const endpoint = eventDay
    ? `/api/v1/my/insights?eventDay=${eventDay}&page=${page}&size=${size}`
    : `/api/v1/my/insights?page=${page}&size=${size}`;

  return fetchApi<MyInsightNoteListProps>(endpoint, {
    method: 'GET',
  });
}
