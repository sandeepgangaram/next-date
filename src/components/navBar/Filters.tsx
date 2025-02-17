"use client";
import { useFilters } from "@/src/hooks/useFilters";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

const Filters = () => {
  const pathname = usePathname();
  const {
    orderByList,
    genders,
    filters,
    isPending,
    withPhotos,
    totalCount,
    selectAge,
    selectGender,
    selectOrder,
    selectPhotos,
  } = useFilters();
  if (pathname !== "/members") return null;

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-secondary font-semibold text-xl">
            Results:{" "}
            {isPending ? <Spinner size="sm" color="secondary" /> : totalCount}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genders.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color={filters.gender.includes(value) ? "secondary" : "default"}
              onClick={() => selectGender(value)}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age range"
            color="secondary"
            size="sm"
            aria-label="Age range slider"
            minValue={18}
            maxValue={100}
            defaultValue={[18, 100]}
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>
        <div className="flex flex-col items-center">
          <p>With photo</p>
          <Switch
            size="sm"
            color="secondary"
            isSelected={withPhotos}
            onValueChange={selectPhotos}
          />
        </div>
        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
