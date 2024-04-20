"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  return(
    <Button className="" >
    Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
