"use client";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
}: CourseEnrollButtonProps) => {
  const onClick = () => {
    toast("Disabled for demo");
  };

  return (
    <Button
      onClick={onClick}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}
