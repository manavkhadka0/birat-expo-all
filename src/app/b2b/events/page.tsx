import { EventsListView } from "@/app/b2b/components/sections/events/view/events-list-view";
import { getEvents } from "@/app/b2b/services/events";

export const revalidate = 10;

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const eventsResponse = await getEvents(page);

  return <EventsListView eventsResponse={eventsResponse} />;
}
