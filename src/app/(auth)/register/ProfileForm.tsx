"use client";

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { subYears, format } from "date-fns";
import { useFormContext } from "react-hook-form";

const ProfileForm = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  return (
    <div className="space-y-4">
      <Select
        defaultSelectedKeys={getValues("gender")}
        label="Gender"
        aria-label="Select gender"
        variant="bordered"
        {...register("gender")}
        isInvalid={!!errors.gender}
        errorMessage={errors.gender?.message as string}
        onChange={(e) => setValue("gender", e.target.value)}
      >
        {genderList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        defaultValue={getValues("dateOfBirth")}
        label="Date of birth"
        type="date"
        variant="bordered"
        max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
        isInvalid={!!errors.dateOfBirth}
        errorMessage={errors.dateOfBirth?.message as string}
        {...register("dateOfBirth")}
      />
      <Textarea
        defaultValue={getValues("description")}
        label="Description"
        variant="bordered"
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
        {...register("description")}
      />
      <Input
        defaultValue={getValues("city")}
        label="City"
        variant="bordered"
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message as string}
        {...register("city")}
      />
      <Input
        defaultValue={getValues("Country")}
        label="Country"
        variant="bordered"
        isInvalid={!!errors.country}
        errorMessage={errors.country?.message as string}
        {...register("country")}
      />
    </div>
  );
};
export default ProfileForm;
