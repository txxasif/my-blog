"use client";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function Pagination({ totalPages, page }) {
  console.log(typeof page);
  const [active, setActive] = useState(page);
  const router = useRouter();
  const queryClient = useQueryClient();

  function setSearchParams(index) {
    router.push(`/?page=${index}`);
    queryClient.invalidateQueries[`page-${index}`];
    setActive(index);
  }
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setSearchParams(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === totalPages) return;
    router.push(`/?page=${active + 1}`);
    queryClient.invalidateQueries[`page-${active + 1}`];
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    router.push(`/?page=${active - 1}`);

    queryClient.invalidateQueries[`page-${active - 1}`];
    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (n) => (
            <IconButton {...getItemProps(n)}>{n}</IconButton>
          )
        )}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
