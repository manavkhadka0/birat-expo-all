import { EventGridSection } from "../events-list/event-grid-section";
import type { EventResponse } from "@/app/b2b/types/events";

interface EventsListViewProps {
  eventsResponse: EventResponse;
}

export const EventsListView = ({ eventsResponse }: EventsListViewProps) => {
  return (
    <>
      <EventGridSection eventsResponse={eventsResponse} />
    </>
  );
};
