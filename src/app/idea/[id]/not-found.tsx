import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function IdeaNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-bold">Idea not found</h1>
      <p className="text-muted-foreground">
        This pain point may have been removed or the link is invalid.
      </p>
      <Link href="/" className={cn(buttonVariants(), "min-h-11 px-4")}>
        Back to feed
      </Link>
    </div>
  );
}
