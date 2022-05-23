import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";
import { IPost, IPostState, IPostVote } from "../typings";

const defaultPostState: IPostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postState = atom<IPostState>({
  key: "postState",
  default: defaultPostState,
});
