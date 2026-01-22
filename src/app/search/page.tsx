import { Suspense } from "react";
import SearchPageContent from "@/components/search/searchContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search params...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
