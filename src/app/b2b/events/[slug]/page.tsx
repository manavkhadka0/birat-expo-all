import { getEventBySlug, getEvents } from "@/app/b2b/services/events";
import { DataNotFound } from "@/app/b2b/components/sections/errors/data-not-found";
import EventDetailView from "@/app/b2b/components/sections/events/view/event-detail-view";
import { Event } from "../../types/events";

export const dynamicParams = true;
export const revalidate = 10;

export async function generateStaticParams() {
  const events = await getEvents("1");
  return events.results.map((event: Event) => ({ slug: event.slug }));
}

const EventDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return (
      <DataNotFound
        title="Event Not Found"
        message="The event you are looking for does not exist."
      />
    );
  }

  return <EventDetailView event={event} />;
};

export default EventDetailPage;
