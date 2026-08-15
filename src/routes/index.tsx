import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/Experience";

const title = "Aditya Sharma — Full Stack Developer";
const description =
  "Portfolio of Aditya Sharma, a Full Stack Developer building interactive web experiences, applications, and AI-powered experiments.";

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
  return <Experience />;
}
