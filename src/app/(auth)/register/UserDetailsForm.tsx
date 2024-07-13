import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

const UserDetailsForm = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <Input
        defaultValue={getValues("name")}
        label="Name"
        variant="bordered"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
        {...register("name")}
      />
      <Input
        defaultValue={getValues("email")}
        label="Email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
        {...register("email")}
      />
      <Input
        defaultValue={getValues("password")}
        label="Password"
        variant="bordered"
        type="password"
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message as string}
        {...register("password")}
      />
    </div>
  );
};
export default UserDetailsForm;
