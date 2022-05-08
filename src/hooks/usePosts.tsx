import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { postState } from "../atoms/postsAtom";
import { firestore, storage } from "../lib/firebase";
import { IPost } from "../typings";

const usePosts = () => {
  const [postsState, setPostsState] = useRecoilState(postState);

  const handleVote = async () => {};

  const handleSelectPost = async () => {};

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

  return {
    postsState,
    setPostsState,
    handleVote,
    handleDeletePost,
    handleSelectPost,
  };
};

export default usePosts;
