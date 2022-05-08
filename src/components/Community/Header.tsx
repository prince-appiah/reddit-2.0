import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "../../hooks/useCommunityData";
import { ICommunity } from "../../typings";

type Props = {
  community: ICommunity;
};

const CommunityHeader = (props: Props) => {
  const { community } = props;
  const { communityData, loading, handleJoinOrJoinCommunity } =
    useCommunityData();

  const isJoined = !!communityData.mySnippets.find(
    (item) => item.communityId === community.id
  );

  return (
    <Flex direction="column" width="100%" height={146}>
      <Box height="50%" bg="blue.400" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth={860}>
          {communityData.currentCommunity.imageURL ? (
            <Image
              src={communityData.currentCommunity.imageURL}
              alt={communityData.currentCommunity.privacyType}
              borderRadius="full"
              position="relative"
              boxSize={16}
              border="4px solid white"
              top={-5}
              color="blue.400"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius={50}
              color="blue.500"
            />
          )}

          <Flex py={2} px={4}>
            <Flex direction="column" mr={6}>
              <Text fontSize={18} fontWeight={800}>
                {community.id}
              </Text>
              <Text fontSize={14} fontWeight={600} color="gray.400">
                r/{community.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              isLoading={loading}
              onClick={() => handleJoinOrJoinCommunity(community, isJoined)}
              height={30}
              px={6}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityHeader;
