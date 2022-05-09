import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";
import { CommunitySnippet, ICommunity, ICommunityState } from "../typings";

const defaultCommunity: ICommunity = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
};

export const defaultCommunityState: ICommunityState = {
  mySnippets: [],
  initSnippetsFetched: false,
  visitedCommunities: {},
  currentCommunity: defaultCommunity,
};

export const communityState = atom<ICommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
