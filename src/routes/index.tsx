import { createFileRoute } from "@tanstack/react-router";
import { DiaryExperience } from "@/components/diary/DiaryExperience";

const title = "Aditya Sharma — The Diary of Becoming a Developer";
const description =
  "An interactive sage-and-beige diary portfolio: the journey of Aditya Sharma from curious student to Full Stack & Cloud Developer, told chapter by chapter.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <DiaryExperience />;
}
