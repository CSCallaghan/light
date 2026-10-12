import { createFileRoute } from "@tanstack/react-router";
import { Nightline } from "@/components/nightline";

export const Route = createFileRoute("/")({ component: Nightline });
