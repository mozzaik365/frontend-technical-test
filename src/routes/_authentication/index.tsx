import { createFileRoute } from "@tanstack/react-router";
import React from "react";

import { MemeListLayout } from "../../layouts/meme-list-layout";
import { MemeList } from "../../components/meme-list";

export const MemeFeedPage: React.FC = () => {
  return (
    <MemeListLayout>
      <MemeList />
    </MemeListLayout>
  );
};

export const Route = createFileRoute("/_authentication/")({
  component: MemeFeedPage,
});
