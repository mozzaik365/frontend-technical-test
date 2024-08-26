import { createFileRoute } from "@tanstack/react-router";
import MemeFeed from "../../components/meme-feed";

export const MemeFeedPage: React.FC = () => {
  return <MemeFeed />;
};

export const Route = createFileRoute("/_authentication/")({
  component: MemeFeedPage,
});
