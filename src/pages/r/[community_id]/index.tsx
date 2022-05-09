import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import { communityState } from "../../../atoms/communityAtoms";
import About from "../../../components/Community/About";
import CreatePost from "../../../components/Community/CreatePost";
import CommunityHeader from "../../../components/Community/Header";
import NotFound from "../../../components/Community/NotFound";
import HomeLayout from "../../../components/layouts/HomeLayout";
import PostsList from "../../../components/Post/PostsList";
import { firestore } from "../../../lib/firebase";
import { ICommunity } from "../../../typings";

type Props = {
  communityData: ICommunity;
};

const CommunityPage = (props: Props) => {
  const { communityData } = props;
  const setCommunityState = useSetRecoilState(communityState);

  useEffect(() => {
    if (communityData) {
      setCommunityState((prev) => ({
        ...prev,
        currentCommunity: communityData,
      }));
      return;
    }
  }, [communityData, setCommunityState]);

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <CommunityHeader community={communityData} />
      <HomeLayout>
        {/* First child */}
        <>
          <CreatePost />
          {/* TODO: Check Reddit page and add the other componenta */}
          <PostsList communityData={communityData} />
        </>

        {/* Second child */}
        <>
          <About communityData={communityData} />
        </>
      </HomeLayout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { community_id } = ctx.query;

  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      community_id as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({
                id: communityDoc.id,
                ...communityDoc.data(),
              })
            )
          : "",
      },
    };
  } catch (error) {
    // or an error page
    console.log("🚀 ~ Community getServerSideProps error", error);
  }
}

export default CommunityPage;
