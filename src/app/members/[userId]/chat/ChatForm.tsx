"use client";

import { createMessage } from "@/src/actions/messageActions";
import { handleFormServerErrors } from "@/src/actions/util";
import { MessageSchema, messageSchema } from "@/src/lib/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

const ChatForm = () => {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const {
    register,
    reset,
    setError,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(params.userId, data);

    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset();
      setTimeout(() => {
        setFocus("text");
      }, 50);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className=" flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message"
          variant="faded"
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text")}
        />
        <Button
          type="submit"
          isIconOnly
          color="secondary"
          radius="full"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className="flex- flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
