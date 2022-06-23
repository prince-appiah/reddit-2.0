import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import About from "../../../../components/Community/About";
import HomeLayout from "../../../../components/layouts/HomeLayout";
import Layout from "../../../../components/layouts/Layout";
import PostItem from "../../../../components/Post/PostItem";
import useCommunityData from "../../../../hooks/useCommunityData";
import usePosts from "../../../../hooks/usePosts";
import { auth, firestore } from "../../../../lib/firebase";
import { IPost } from "../../../../typings";

const PostPage = () => {
  const { postsState, setPostsState, handleDeletePost, handleVote } =
    usePosts();
  const { communityData } = useCommunityData();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, `posts/${postId}`);
      const postDoc = await getDoc(postDocRef);

      setPostsState((prev) => ({
        ...prev,
        selectedPost: {
          id: postDoc.id,
          ...postDoc.data(),
        } as IPost,
      }));
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  };

  useEffect(() => {
    if (router.query.pid && !postsState.selectedPost) {
      fetchPost(router.query.pid as string);
    }
  }, [router.query, postsState.selectedPost]);

  return (
    <HomeLayout>
      <>
        {/* selected post */}
        {postsState.selectedPost && (
          <PostItem
            onDeletePost={handleDeletePost}
            onVote={handleVote}
            post={postsState.selectedPost!}
            userVoteValue={
              postsState.postVotes.find(
                (p) => p.postId === postsState.selectedPost?.id
              )?.voteValue as number
            }
            userIsCreator={user?.uid === postsState.selectedPost?.creatorId}
          />
        )}
        {/* comments */}
      </>

      <>
        {/* about */}
        {communityData.currentCommunity && (
          <About communityData={communityData.currentCommunity} />
        )}
      </>
    </HomeLayout>
  );
};

export default PostPage;
