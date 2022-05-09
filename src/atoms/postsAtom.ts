import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";
import { IPost, IPostVote } from "../typings";

interface PostState {
  selectedPost: IPost | null;
  posts: IPost[];
  postVotes: IPostVote[];
  postsCache: {
    [key: string]: IPost[];
  };
  postUpdateRequired: boolean;
}

const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const postState = atom<PostState>({
  key: "postState",
  default: defaultPostState,
});
