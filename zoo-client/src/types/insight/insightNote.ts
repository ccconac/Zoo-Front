import { ProfileProps } from './insightProfile';

export interface INoteList {
  noteList: InsightNoteProps[];
}

export interface INote {
  note: InsightNoteProps;
}

export interface InsightNoteProps {
  id: number;
  memo: string;
  isPublic: boolean;
  isAnonymous: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  displayName: string;
  job: string;
  isLiked: boolean;
  hasSpeakerComment: boolean;
  profile: ProfileProps;
  isMine: boolean;
}

export interface InsightNoteListProps {
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: InsightNoteProps[];
}

export interface MyInsightNoteProps {
  insightId: number;
  memo: string;
  isPublic: boolean;
  isAnonymous: boolean;
  updatedAt: string;
  sessionName: string;
  isDraft: boolean;
  sessionId: number;
}

export interface IMyNote {
  note: MyInsightNoteProps;
}
export interface MyInsightNoteListProps {
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: MyInsightNoteProps[];
}
