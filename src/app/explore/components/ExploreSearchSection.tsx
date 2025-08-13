import { useVenueFilteringContext } from "@/contexts/venue-filter-context";
import { ExploreSearch } from "./ExploreSearch";

export const ExploreSearchSection = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useVenueFilteringContext();

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Perfect Venue
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing event spaces for weddings, corporate events, parties,
          and more
        </p>
      </div>

      <ExploreSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </>
  );
};
