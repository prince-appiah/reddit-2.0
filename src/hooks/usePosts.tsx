import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { communityState } from "../atoms/communityAtoms";
import { authModalState } from "../atoms/modalAtoms";
import { postState } from "../atoms/postsAtom";
import { auth, firestore, storage } from "../lib/firebase";
import { IPost, IPostVote } from "../typings";

const usePosts = () => {
  const [postsState, setPostsState] = useRecoilState(postState);
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const currentCommunity = useRecoilValue(communityState).currentCommunity;

  const handleVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: IPost,
    vote: number,
    comunity_id: string
  ) => {
    event.stopPropagation();
    // check if user is logged in
    if (!user?.uid) {
      setAuthModalState((prev) => ({ ...prev, open: true, view: "login" }));
      return;
    }

    const existingVote = postsState.postVotes.find(
      (vote) => vote.postId === post.id
    );

    try {
      const batch = writeBatch(firestore);
      let updatedPost = { ...post };
      let updatedPosts = [...postsState.posts];
      let updatedPostVotes = [...postsState.postVotes];
      let voteChange = vote;

      // new vote
      if (!existingVote) {
        // create new vote
        const postVoteRef = doc(
          collection(firestore, `users/${user?.uid}/postVotes`)
        );

        const newVote: IPostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId: comunity_id,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);
        // await batch.commit()

        // update vote value in state
        updatedPost.voteStatus = post.voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // ?vote already exists
        const postVoteRef = doc(
          firestore,
          `users/${user?.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          // add or subtract 1 from post vote status
          voteChange *= -1;
          updatedPost.voteStatus = post.voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );

          batch.delete(postVoteRef);
          // voteChange *= -1;
        } else {
          // flipping votes - add or subtract 2 from post vote status
          voteChange = 2 * vote;
          updatedPost.voteStatus = post.voteStatus + 2 * vote;
          const voteIndex = postsState.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          // or you can write this for the below statement ==== updatedPostVotes[voteIndex].voteValue = vote
          if (voteIndex !== -1) {
            updatedPostVotes[voteIndex] = {
              ...existingVote,
              voteValue: vote,
            };
          }

          batch.update(postVoteRef, { voteValue: vote });
          // voteChange = 2 * vote;
        }
      }

      let updatedState = { ...postsState, postVotes: updatedPostVotes };

      const postIndex = postsState.posts.findIndex(
        (item) => item.id === post.id
      );

      if (postsState.selectedPost) {
        setPostsState((prev) => ({ ...prev, selectedPost: updatedPost }));
      }

      // if (!postIndex !== undefined) {
      updatedPosts[postIndex!] = updatedPost;

      updatedState = {
        ...updatedState,
        posts: updatedPosts,
        postsCache: {
          ...updatedState.postsCache,
          [comunity_id]: updatedPosts,
        },
      };
      // }

      // if (updatedState.selectedPost) {
      //   updatedState = { ...updatedState, selectedPost: updatedPost };
      // }

      // update state
      setPostsState(updatedState);

      // update post doc in db
      const postRef = doc(firestore, `posts/${post.id!}`);
      batch.update(postRef, { voteStatus: post.voteStatus + voteChange });

      await batch.commit();
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  };

  const handleSelectPost = async (post: IPost) => {
    setPostsState((prev) => ({ ...prev, selectedPost: post }));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const handleDeletePost = async (post: IPost): Promise<boolean> => {
    try {
      // check if there is image, delete it if there is
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }
      // deelte post doc from firestore
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);
      // update recoil state
      setPostsState((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p.id !== post.id),
      }));
      //
      return true;
    } catch (error) {
      return false;
    }
  };

  const getCommunityPostVotes = async (community_id: string) => {
    try {
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("communityId", "==", community_id)
      );

      const postVotesDocs = await getDocs(postVotesQuery);
      const postVotes = postVotesDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostsState((prev) => ({
        ...prev,
        postVotes: postVotes as IPostVote[],
      }));
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  };

  useEffect(() => {
    if (!user || !currentCommunity?.id) return;
    getCommunityPostVotes(currentCommunity?.id);
  }, [currentCommunity, user]);

  useEffect(() => {
    if (!user) {
      setPostsState((prev) => ({ ...prev, postVotes: [] }));
    }
  }, [user]);

  return {
    postsState,
    setPostsState,
    handleVote,
    handleDeletePost,
    handleSelectPost,
  };
};

export default usePosts;
