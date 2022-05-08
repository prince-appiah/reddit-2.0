import { Timestamp } from "firebase/firestore";

export interface ICommunityState {
  [key: string]:
    | CommunitySnippet[]
    | { [key: string]: ICommunity }
    | ICommunity
    | boolean
    | undefined;
  mySnippets: CommunitySnippet[];
  initSnippetsFetched: boolean;
  visitedCommunities: {
    [key: string]: ICommunity;
  };
  currentCommunity: ICommunity;
}

export interface ICommunity {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface IPost {
  id: string;
  communityId: string;
  communityImageURL?: string;
  userDisplayText: string; // change to authorDisplayText
  creatorId: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  currentUserVoteStatus?: {
    id: string;
    voteValue: number;
  };
  imageURL?: string;
  postIdx?: number;
  createdAt: Timestamp;
  editedAt?: Timestamp;
}

export type IPostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};
