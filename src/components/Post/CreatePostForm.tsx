import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Stack,
  Textarea,
  Image,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import TabItem from "./TabItem";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import TextInputs from "./TextInputs";
import ImageUpload from "./ImageUpload";
import { postState } from "../../atoms/postsAtom";
import { firestore, storage } from "../../lib/firebase";
import { IPost } from "../../typings";
import useFileUpload from "../../hooks/useFileUpload";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

type CreatePostFormProps = {
  communityId: string;
  communityImageURL?: string;
  user: User;
};

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  communityId,
  communityImageURL,
  user,
}) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const setPostItems = useSetRecoilState(postState);
  const { onSelectFile, selectedFile, setSelectedFile } = useFileUpload();

  const handleCreatePost = async () => {
    setLoading(true);
    const { title, body } = textInputs;
    const { community_id } = router.query;
    // const newPost: IPost = {
    const newPost = {
      communityId: community_id,
      communityImageURL: communityImageURL || "",
      creatorId: user?.uid,
      userDisplayText: user.email!.split("@")[0],
      title,
      body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      editedAt: serverTimestamp() as Timestamp,
    };

    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      console.log("🚀 ~ postDocRef", postDocRef);

      // await addDoc(collection(firestore, "posts"), {});

      console.log("HERE IS NEW POST ID", postDocRef.id);

      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }

      // Clear the cache to cause a refetch of the posts
      setPostItems((prev) => ({
        ...prev,
        postUpdateRequired: true,
      }));

      router.back();
    } catch (error) {
      console.log("createPost error", error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, index) => (
          <TabItem
            key={index}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectFileRef={selectFileRef}
            onSelectImage={onSelectFile}
          />
        )}

        {/* errors */}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text mr={2}>Could not create post</Text>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};
export default CreatePostForm;
