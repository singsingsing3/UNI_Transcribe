import { Summary } from "@/components/Summary/Summary";
import { useRouter } from "next/router";
import React from "react";

export default function SummaryPage() {
  const router = useRouter();
  const { leng, translateText } = router.query;

  return (
    <div>
      {typeof leng === "string" && typeof translateText === "string" && (
        <Summary leng={leng} translateText={translateText} />
      )}
    </div>
  );
}
