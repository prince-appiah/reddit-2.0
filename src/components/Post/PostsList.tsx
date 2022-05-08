import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import usePosts from "../../hooks/usePosts";
import { auth, firestore } from "../../lib/firebase";
import { ICommunity, IPost } from "../../typings";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type Props = {
  communityData: ICommunity;
  userId?: string;
};

const PostsList = ({ communityData, userId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user] = useAuthState(auth);
  const {
    postsState,
    handleVote,
    setPostsState,
    handleDeletePost,
    handleSelectPost,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      setPostsState((prev) => ({ ...prev, posts: posts as IPost[] }));
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postsState.posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onDeletePost={handleDeletePost}
              onSelectPost={handleSelectPost}
              onVote={handleVote}
              userVoteValue={
                postsState.postVotes.find((vote) => vote.postId === post.id!)
                  ?.voteValue as number
              }
              userIsCreator={user?.uid === post.creatorId}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default PostsList;
