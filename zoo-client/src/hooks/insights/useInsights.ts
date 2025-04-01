import { createNote } from '@/actions/insight-form';
import {
  deleteInsight,
  getInsightDetailed,
  getInsightNote,
  getMyInsights,
} from '@/services/insight';
import useModalStore from '@/store/common/useModalStore';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';

export const insightsQueryKey = (id: number, sort: string) => [
  'insights',
  id,
  sort,
];

export const insightDetailedQueryKey = (id: number) => ['insights', id];

export const useGetInsightNote = (id: number, sort: string, size?: number) => {
  return useInfiniteQuery({
    queryKey: insightsQueryKey(id, sort),
    queryFn: async ({ pageParam }) => {
      const res = await getInsightNote(id, pageParam, sort, size ? size : 4);
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (last) => {
      if (last && last.pageNumber + 1 < last.totalPages) {
        return last.pageNumber + 1;
      }
      return undefined;
    },
  });
};

export const useGetInfiniteMyInsightNote = (eventDay: string) => {
  return useInfiniteQuery({
    queryKey: ['insights', eventDay],
    queryFn: async ({ pageParam }) => {
      const res = await getMyInsights({
        eventDay: eventDay,
        page: pageParam,
        size: 5,
      });
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (last) => {
      if (last && last.pageNumber + 1 < last.totalPages) {
        return last.pageNumber + 1;
      }
      return undefined;
    },
  });
};

export function useInsightsDetailed(id: number) {
  return useQuery({
    queryKey: insightDetailedQueryKey(id),
    queryFn: async () => {
      const res = await getInsightDetailed(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useGetAnotherInsight() {
  return useQuery({
    queryKey: ['insights', 'another'],
    queryFn: async () => {
      const res = await getInsightNote(1, 1, 'like', 2);
      return res.data;
    },
  });
}

export function useMutationNoteForm(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: insightsQueryKey(id, 'latest'),
      });
    },
    onError: (error) => {
      console.error('메모 저장 실패:', error);
    },
  });
}

export function useMutationDeleteNote() {
  const queryClient = useQueryClient();
  const { closeModal } = useModalStore();

  return useMutation({
    mutationFn: (id: number) => deleteInsight(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['insights'],
      });
      closeModal();
    },
    onError: (error) => {
      console.error('메모 삭제 실패:', error);
    },
  });
}
