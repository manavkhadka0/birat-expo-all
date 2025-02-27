import useSWR from "swr";
import axios from "axios";
import { Wish, Offer, WishAndOffer } from "@/app/b2b/types/wish";

// API Response Types
type WishResponse = {
  results: Wish[];
  count: number;
  next: string | null;
  previous: string | null;
};

type OfferResponse = {
  results: Offer[];
  count: number;
  next: string | null;
  previous: string | null;
};

// Axios Fetcher for SWR
const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: { Accept: "application/json" },
    })
    .then((res) => res.data);

// Custom Hook for Wishes
export function useWishes() {
  const { data, error, isLoading, mutate } = useSWR<WishResponse>(
    `https://cim.baliyoventures.com/api/wish_and_offers/wishes/`,
    fetcher
  );

  return {
    wishes: data?.results.slice(0, 5) || [],
    isLoading,
    mutate,
    error,
  };
}

// Custom Hook for Offers
export function useOffers() {
  const { data, error, isLoading, mutate } = useSWR<OfferResponse>(
    `https://cim.baliyoventures.com/api/wish_and_offers/offers/`,
    fetcher
  );

  return {
    offers: data?.results.slice(0, 5) || [],
    isLoading,
    error,
    mutate,
  };
}

export function useWishAndOffer() {
  const { data, isLoading, error, mutate } = useSWR<WishAndOffer>(
    `https://cim.baliyoventures.com/api/wish_and_offers/wish-offers/`,
    fetcher
  );
  return {
    wish_and_offers: data,
    isLoading,
    error,
    mutate,
  };
}

// Add this function alongside existing code
export async function getWishes() {
  const response = await fetch(
    `https://cim.baliyoventures.com/api/wish_and_offers/wishes/`,
    { headers: { Accept: "application/json" } }
  );
  const data = await response.json();
  return data.results || [];
}
