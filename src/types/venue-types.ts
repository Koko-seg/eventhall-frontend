export type VenueType = {
  id: number;
  name: string;
  description?: string;
  location: string;
  capacity: number;
  price: number;
  rating?: number;
  amenities: Amenity[];
  images: VenueImage[];
  videos?: VenueVideos[];
  tags: VenueTag[];
  Super_Admin: User;
  Super_AdminId: number;
  admins: VenueAdmin[];
  bookings: Booking[];
  reviews: Review[];
  createdAt: string; 
  updatedAt: string; 
};

    export type VenueImage = {
    id: number;
    url: string;
    altText?: string;
    createdAt: string; 
    updatedAt: string;
    }

    export type VenueAdmin = {
  venue: VenueType;     
  venueId: number;  
  admin: User;       
  adminId: number;   
  role: Role;        
};

export type User ={
    id: number;
    email: string;
    fullName: string;
    profilePicture?: string;
    createdAt: string;
    updatedAt: string;
    role: Role; 
    isActive: boolean;
}

export enum Role {
    ADMIN = "admin",
    SUPER_ADMIN = "super_admin",
    USER = "user"
}
export type Amenity = {
    id: number;
    name: string;
    description?: string;
    iconUrl?: string;
    createdAt: string;
    updatedAt: string;
};

export type VenueTag = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export type Booking = {
    id: number;
    userId: number;
    venueId: number;
    startDate: string; 
    endDate: string;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: string;
    updatedAt: string;
};
export type Review = {
    id: number;
    userId: number;
    venueId: number;
    rating: number;
    comment?: string
    createdAt: string;
    updatedAt: string;
    user: User; 
    venue: VenueType;
};
export type VenueDetails = {
    venue: VenueType;
    images: VenueImage[];
    amenities: Amenity[];
    reviews: Review[];
    bookings: Booking[];
    admins: VenueAdmin[];
    tags: VenueTag[];
};

export type VenueSearchParams = {
    location?: string;
    capacity?: number;
    priceRange?: [number, number];
    amenities?: string[];
    tags?: string[];
};

export type VenueFilter = {
    location?: string;
    capacity?: number;
    priceRange?: [number, number];
    amenities?: string[];
    tags?: string[];
};

export type VenueSort = {
    field: "name" | "rating" | "price";
    order: "asc" | "desc";
};

export type VenueSearchResult = {
    venues: VenueType[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
};

export type VenueBooking = {
    id: number;
    userId: number;
    venueId: number;
    startDate: string;
    endDate: string;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: string;
    updatedAt: string;
    user: User;
    venue: VenueType;
};

export type VenueReview = {
    id: number;
    userId: number;
    venueId: number;
    rating: number;
    comment?: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    venue: VenueType;
};

export type VenueContact = {
    phone: string;
    email: string;
    manager: string;
    responseTime: string; 
};

export type VenueAvailability = {
    date: string; 
    isAvailable: boolean; 
};

export type VenueFeature = {
    id: number;
    name: string;
    description?: string;
};

export type VenuePolicy = {
    id: number;
    name: string;
    description?: string;
};

export type VenueAward = {
    id: number;
    name: string;
    description?: string;
    iconUrl?: string;
    award:VenueBadgeProps
};

export type VenueImageModalProps = {
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    venueName: string;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
};

export type VenueHeaderProps = {
    venue: VenueType;
};

export type VenueTabsProps = {
    venue: VenueType;
};

export type VenueImageProps = {
    image: VenueImage;
    onClick: () => void;
};

export type VenueReviewProps = {
    review: Review;
};

export type VenueBadgeProps = {
    award: string;
    index: number;
};

export type VenueAmenitiesProps = {
    amenities: Amenity[];
};

export type VenueFeaturesProps = {
    features: VenueFeature[];
};

export type VenuePoliciesProps = {
    policies: VenuePolicy[];
};

export type VenueReviewsProps = {
    reviews: Review[];
};

export type VenueSimilarProps = {
    similarVenues: VenueType[];
};

export type VenueNavigationProps = {
    venueId: number;
    onToggleLike: () => void
    currentTab: string;
    isLiked: boolean;
};

export type VenueImageGalleryProps = {
    images: string[];
    videos?: string[];
    venueName: string;
    onOpenModal: () => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    onImageClick: (index: number) => void;
};
export type VenueVideos={
    id: number;
    url: string;
    thumbnailUrl?: string;
    venueId: number;
    createdAt: string;
    updatedAt: string;
};
export type VenueSidebarProps = {
    venue: VenueType;
    isLiked: boolean;
    onLikeToggle: () => void;
};

export type VenueDetailsPageProps = {
    venueId: number;
};

export type VenueDetailsContextProps = {
    venue: VenueType;
    isLiked: boolean;
    setIsLiked: (liked: boolean) => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    isImageModalOpen: boolean;
    setIsImageModalOpen: (open: boolean) => void;
};

export type VenueDetailsProviderProps = {
    children: React.ReactNode;
    venueId: number;
};

export type VenueDetailsContextValue = {
    venue: VenueType;
    isLiked: boolean;
    setIsLiked: (liked: boolean) => void;
    currentImageIndex: number;
    setCurrentImageIndex: (index: number) => void;
    isImageModalOpen: boolean;
    setIsImageModalOpen: (open: boolean) => void;
};

export type VenueDetailsState = {
    venue: VenueType | null;
    isLiked: boolean;
    currentImageIndex: number;
    isImageModalOpen: boolean;
};

export type VenueDetailsAction =
    | { type: "SET_VENUE"; payload: VenueType }
    | { type: "TOGGLE_LIKE" }
    | { type: "SET_CURRENT_IMAGE_INDEX"; payload: number }
    | { type: "TOGGLE_IMAGE_MODAL"; payload: boolean };

export type VenueDetailsReducer = (state: VenueDetailsState, action: VenueDetailsAction) => VenueDetailsState;

export type VenueTabsTriggerProps = {
    value: string;
    children: React.ReactNode;
};

export type VenueTabsListProps = {
    children: React.ReactNode;
};

export type VenueTabsContentProps = {
    value: string;
    children: React.ReactNode;
};
