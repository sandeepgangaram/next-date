"use client";
import { resetPassword } from "@/src/actions/authActions";
import CardWrapper from "@/src/components/CardWrapper";
import ResultMessage from "@/src/components/ResultMessage";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/src/lib/schemas/resetPasswordSchema";
import { ActionResult } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(await resetPassword(data.password, searchParams.get("token")));
    reset();
  };

  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Reset password"
      subHeaderText="Enter your new password below"
      body={
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <Input
            type="password"
            placeholder="Password"
            variant="bordered"
            defaultValue=""
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            variant="bordered"
            defaultValue=""
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message as string}
          />
          <Button
            type="submit"
            color="secondary"
            isLoading={isSubmitting}
            isDisabled={!isValid}
          >
            Reset Password
          </Button>
        </form>
      }
      footer={<ResultMessage result={result} />}
    />
  );
};
export default ResetPasswordForm;
