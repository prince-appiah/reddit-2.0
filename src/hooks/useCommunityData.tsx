import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { communityState } from "../atoms/communityAtoms";
import { authModalState } from "../atoms/modalAtoms";
import { auth, firestore } from "../lib/firebase";
import { CommunitySnippet, ICommunity } from "../typings";

const useCommunityData = () => {
  const [communityData, setCommunityData] = useRecoilState(communityState);
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuthModal = useSetRecoilState(authModalState);

  const getSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDocs(
        collection(firestore, `users/${user?.uid}/communities`)
      );

      const userCommunities = response.docs.map((doc) => ({ ...doc.data() }));

      setCommunityData((prev) => ({
        ...prev,
        mySnippets: userCommunities as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  }, [setCommunityData, user?.uid]);

  useEffect(() => {
    if (!user) {
      setCommunityData((prev) => ({ ...prev, mySnippets: [] }));
      return;
    }
    getSnippets();
  }, [getSnippets, user]);

  const getCommunityData = async (community_id: string) => {
    try {
      const commDocRef = doc(firestore, `commnunites/${community_id}`);
      const commRef = await getDoc(commDocRef);

      setCommunityData((prev) => ({
        ...prev,
        currentCommunity: { id: commRef.id, ...commRef.data() } as ICommunity,
      }));
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  };

  useEffect(() => {
    if (router.query.community_id || !communityData.currentCommunity) {
      getCommunityData(router.query.community_id as string);
    }
  }, [router.query, communityData.currentCommunity]);

  const handleJoinOrJoinCommunity = (
    community: ICommunity,
    isJoined: boolean
  ) => {
    //  check if user is logged in - display login
    if (!user) {
      setAuthModal((prev) => ({ ...prev, open: true, view: "login" }));
      return;
    }

    if (isJoined) {
      return leaveCommunity(community);
    }
    return joinCommunity(community);
  };

  const joinCommunity = async (community: ICommunity) => {
    // create new community, update number of members
    // finally, update the recoil stte
    setLoading(true);
    try {
      const batchOperation = writeBatch(firestore);
      const newCommunity: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };

      batchOperation.set(
        doc(firestore, `users/${user?.uid}/communities`, community.id),
        newCommunity
      );
      batchOperation.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      await batchOperation.commit();

      setCommunityData((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newCommunity],
      }));
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  const leaveCommunity = async (community: ICommunity) => {
    // delete community from user, update number of members
    // finally, update the recoil state
    setLoading(true);
    try {
      const batchOperation = await writeBatch(firestore);

      batchOperation.delete(
        doc(firestore, `users/${user?.uid}/communities`, community.id)
      );

      batchOperation.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(-1),
      });

      await batchOperation.commit();

      setCommunityData((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== community.id
        ),
      }));

      setLoading(false);
    } catch (error: any) {
      console.log("🚀 ~ error", error);
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return {
    communityData,
    joinCommunity,
    loading,
    leaveCommunity,
    handleJoinOrJoinCommunity,
    getSnippets,
    getCommunityData,
  };
};

export default useCommunityData;
