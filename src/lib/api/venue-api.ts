import { VenueType } from "@/types/venue-types";

export const getVenues = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/explore`
    );

    const { venue } = await response.json();

    return venue as VenueType[];
  } catch (error) {
    console.log(error);
  }
};