import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { MemeEditor } from "../../components/meme-editor";
import { useEffect, useMemo } from "react";
import { Plus, Trash } from "@phosphor-icons/react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { Text } from "../../services/api";
import { useSubmitMeme } from "../../hooks/use-submit-meme";

export const Route = createFileRoute("/_authentication/create")({
  component: CreateMemePage,
});

type CreateForm = {
  picture: File;
  description: string;
  texts: Text[];
};

function CreateMemePage() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch: watchForm,
  } = useForm<CreateForm>({
    defaultValues: {
      texts: [],
      description: "",
      picture: undefined,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "texts",
    shouldUnregister: true,
  });

  const { mutate, data } = useSubmitMeme();

  useEffect(() => {
    console.log("mutate data", data);
  }, [data]);

  const onSubmit: SubmitHandler<CreateForm> = async (data) => {
    const result = mutate(data);
    console.log("result", result);
  };

  const handleDrop = (file: File) => {
    setValue("picture", file);
  };

  const watchPicture = watchForm("picture");

  const pictureUrl = useMemo(() => {
    if (!watchPicture) {
      return;
    }
    return URL.createObjectURL(watchPicture);
  }, [watchPicture]);

  const handleAddCaptionButtonClick = () => {
    append({
      content: `New caption ${fields.length + 1}`,
      x: Math.random() * 400,
      y: Math.random() * 225,
    });
  };

  //TODO: as Text[] should be removed
  const watchedTexts = useWatch({
    control,
    name: "texts",
  }) as Text[];

  const memePicture = useMemo(() => {
    if (!pictureUrl) {
      return undefined;
    }
    return {
      pictureUrl: pictureUrl || "",
      texts: watchedTexts || [],
    };
  }, [pictureUrl, watchedTexts]);

  if (data) {
    return <Navigate to={`/#meme-${data.id}`} />;
  }

  return (
    <Flex width="full" height="full">
      <Box flexGrow={1} height="full" p={4} overflowY="auto">
        <VStack spacing={5} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Upload your picture
            </Heading>
            <MemeEditor onDrop={handleDrop} memePicture={memePicture} />
          </Box>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Describe your meme
            </Heading>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Type your description here..."
            />
          </Box>
        </VStack>
      </Box>
      <Flex
        flexDir="column"
        width="30%"
        minW="250"
        height="full"
        boxShadow="lg"
      >
        <Heading as="h2" size="md" mb={2} p={4}>
          Add your captions
        </Heading>
        <Box p={4} flexGrow={1} height={0} overflowY="auto">
          <VStack>
            {fields.map((field, index) => {
              return (
                <Flex width="full" key={field.id}>
                  <Input
                    key={field.id + "-content"}
                    {...register(`texts.${index}.content` as const)}
                    mr={1}
                  />
                  <IconButton
                    onClick={() => {
                      remove(index);
                    }}
                    aria-label="Delete caption"
                    icon={<Icon as={Trash} />}
                  />
                </Flex>
              );
            })}
            <Button
              colorScheme="cyan"
              leftIcon={<Icon as={Plus} />}
              variant="ghost"
              size="sm"
              width="full"
              onClick={handleAddCaptionButtonClick}
              isDisabled={memePicture === undefined}
            >
              Add a caption
            </Button>
          </VStack>
        </Box>
        <HStack p={4}>
          <Button
            as={Link}
            to="/"
            colorScheme="cyan"
            variant="outline"
            size="sm"
            width="full"
          >
            Cancel
          </Button>
          <Button
            colorScheme="cyan"
            size="sm"
            width="full"
            color="white"
            onClick={handleSubmit(onSubmit)}
            isDisabled={memePicture === undefined}
          >
            Submit
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
