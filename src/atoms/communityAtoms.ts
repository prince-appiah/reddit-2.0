import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";
import { CommunitySnippet, ICommunity } from "../typings";

interface CommunityState {
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

const defaultCommunity: ICommunity = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
};

export const defaultCommunityState: CommunityState = {
  mySnippets: [],
  initSnippetsFetched: false,
  visitedCommunities: {},
  currentCommunity: defaultCommunity,
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
