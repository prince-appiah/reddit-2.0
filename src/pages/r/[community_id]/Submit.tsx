import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communityAtoms";
import About from "../../../components/Community/About";
import HomeLayout from "../../../components/layouts/HomeLayout";
import CreatePostForm from "../../../components/Post/CreatePostForm";
import useCommunityData from "../../../hooks/useCommunityData";
import { auth } from "../../../lib/firebase";

type Props = {};

const Submit = (props: Props) => {
  const [user, userLoading, error] = useAuthState(auth);
  const { loading } = useCommunityData();
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);
  const { community } = router.query;

  useEffect(() => {
    if (!user && !userLoading && communityStateValue.currentCommunity.id) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, userLoading, communityStateValue.currentCommunity, router]);

  return (
    <HomeLayout>
      <>
        {/* new post form */}
        <Box py={4} px={0} borderBottom="1px solid" borderColor="white">
          <Text>Create A Post</Text>

          {user && (
            <CreatePostForm
              communityId={communityStateValue.currentCommunity?.id}
              communityImageURL={communityStateValue.currentCommunity.imageURL}
              user={user}
            />
          )}
        </Box>
      </>

      <>
        {/* about component */}
        {communityStateValue.currentCommunity && (
          <>
            <About
              communityData={communityStateValue.currentCommunity}
              pt={6}
              onCreatePage
              loading={loading}
            />
          </>
        )}
      </>
    </HomeLayout>
  );
};

export default Submit;
