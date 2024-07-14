"use client";
import { signInUser } from "@/src/actions/authActions";
import { LoginSchema, loginSchema } from "@/src/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const submitHandler = async (data: LoginSchema) => {
    const result = await signInUser(data);

    if (result.status === "success") {
      router.push("/members");
      router.refresh();
    } else {
      toast.error(result.error as string);
      console.log(result.error);
    }
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
              {...register("email")}
            />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
              {...register("password")}
            />
            <Button
              isLoading={isSubmitting}
              fullWidth
              color="secondary"
              type="submit"
              isDisabled={!isValid}
            >
              Login
            </Button>
            <div className="flex justify-center hover:underline text-sm">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
