import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { NextRouter, useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBook,
  IoBookmarkOutline,
} from "react-icons/io5";
import Link from "next/link";
import { IPost } from "../../typings";

type Props = {
  post: IPost;
  userIsCreator: boolean;
  userVoteValue: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: IPost,
    vote: number,
    comunity_id: string
  ) => void;
  onDeletePost: (post: IPost) => Promise<boolean>;
  onSelectPost?: (post: IPost) => void;
};

const PostItem = ({
  post,
  userIsCreator,
  userVoteValue,
  onDeletePost,
  onSelectPost,
  onVote,
}: Props) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const singlePostPage = !onSelectPost;
  const router = useRouter();

  const handleDelete = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try {
      setIsDeleting(true);
      const response = await onDeletePost(post);

      if (!response) {
        throw new Error("Could not delete post");
      }
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }

      setIsDeleting(false);
    } catch (error: any) {
      setIsDeleting(false);
      setError(error.message);
    }
    // setIsDeleting(false);
  };

  return (
    <Flex
      onClick={() => onSelectPost && onSelectPost(post)}
      border="1px solid"
      bg="white"
      borderColor={singlePostPage ? "white" : "gray.300"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : 4}
      cursor={singlePostPage ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width={10}
        borderRadius={singlePostPage ? 0 : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={30}
          onClick={(ev) => onVote(ev, post, 1, post.communityId)}
          cursor="pointer"
        />
        <Text fontSize={13}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue == -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={30}
          onClick={(ev) => onVote(ev, post, -1, post.communityId)}
          cursor="pointer"
        />
      </Flex>

      {/* right side */}
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>{error}</Text>
          </Alert>
        )}
        <Stack spacing={1} p={3}>
          <Stack direction="row" spacing={0.6} align="center" fontSize={13}>
            {/* display comm icon based on page */}
            <Text>
              Posted by: u/{post.userDisplayText}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>

          <Text fontSize={15} fontWeight={600}>
            {post.title}
          </Text>

          <Text fontSize={14}>{post.body}</Text>

          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height={200} width="100%" borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight={460}
                alt={post.title}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>

        <Flex align="center" ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            cursor="pointer"
            py={2}
            px={3}
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize={14}>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            py={2}
            px={3}
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={14}>Share</Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            py={2}
            px={3}
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={14}>Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              cursor="pointer"
              py={2}
              px={3}
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              onClick={(event: any) => handleDelete(event)}
            >
              {isDeleting ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={14}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
