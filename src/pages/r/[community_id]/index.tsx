import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import safeJsonStringify from "safe-json-stringify";
import React from "react";
import { firestore } from "../../../lib/firebase";
import { ICommunity } from "../../../typings";
import NotFound from "../../../components/Community/NotFound";
import CommunityHeader from "../../../components/Community/Header";
import HomeLayout from "../../../components/layouts/HomeLayout";

type Props = {
  communityData: ICommunity;
};

const CommunityPage = (props: Props) => {
  const { communityData } = props;

  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <CommunityHeader community={communityData} />
      <HomeLayout>
        {/* First child */}
        <>
          <div>Left Hand Side</div>
        </>

        {/* Second child */}
        <>
          <div>Right Hnd side</div>
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
