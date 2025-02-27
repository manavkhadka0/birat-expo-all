import { Event, EventResponse } from "@/app/b2b/types/events";
import axios from "axios";

export async function getEvents(page: string = "1"): Promise<EventResponse> {
  try {
    const response = await axios.get<EventResponse>(
      `https://cim.baliyoventures.com/api/events/events/?page=${
        page ? page : 1
      }`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return {
      results: [],
      count: 0,
      next: null,
      previous: null,
    };
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await axios.get<Event>(
      `https://cim.baliyoventures.com/api/events/events/${slug}/`,
      { headers: { Accept: "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch event with slug ${slug}:`, error);
    return null;
  }
}
