import propDuplex from "@/assets/prop-duplex.jpg";
import propApartment from "@/assets/prop-apartment.jpg";
import propTerrace from "@/assets/prop-terrace.jpg";
import propStudio from "@/assets/prop-studio.jpg";
import propApartmentVi from "@/assets/prop-apartment-vi.jpg";
import prop1Bed from "@/assets/prop-1bed.jpg";

export type Property = {
  id: string;
  img: string;
  gallery: string[];
  title: string;
  location: string;
  city: string;
  type: string;
  bedrooms: number;
  priceValue: number;
  price: string;
  beds: string;
  baths: string;
  size: string;
  furnishing: "Furnished" | "Unfurnished";
  listedAt: number;
  description: string;
  highlights: string[];
  amenities: string[];
  landlord: { name: string; role: string; responseTime: string };
};

export const allProperties: Property[] = [
  {
    id: "3-bedroom-duplex-lekki",
    img: propDuplex,
    gallery: [propDuplex, propTerrace, propStudio, prop1Bed],
    title: "3 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    type: "Duplex",
    bedrooms: 3,
    priceValue: 2500000,
    price: "₦2,500,000",
    beds: "3 Beds",
    baths: "3 Baths",
    size: "220 sqm",
    furnishing: "Furnished",
    listedAt: 6,
    description:
      "A beautifully finished 3 bedroom duplex in a secure, gated estate in Lekki Phase 1. The home features an open-plan living area, fitted kitchen, en-suite bedrooms and a private driveway with ample parking.",
    highlights: ["Gated estate", "24/7 security", "Private parking", "Fitted kitchen"],
    amenities: ["Borehole water", "Backup generator", "Air conditioning", "CCTV", "Balcony"],
    landlord: { name: "Mr. Adewale Johnson", role: "Verified Landlord", responseTime: "Usually replies within 2 hours" },
  },
  {
    id: "2-bedroom-apartment-yaba",
    img: propApartment,
    gallery: [propApartment, prop1Bed, propStudio, propApartmentVi],
    title: "2 Bedroom Apartment",
    location: "Yaba, Lagos",
    city: "Lagos",
    type: "Apartment",
    bedrooms: 2,
    priceValue: 1200000,
    price: "₦1,200,000",
    beds: "2 Beds",
    baths: "2 Baths",
    size: "95 sqm",
    furnishing: "Furnished",
    listedAt: 5,
    description:
      "A bright and modern 2 bedroom apartment minutes away from Yaba's tech hub. Comes fully furnished with a spacious living room, en-suite master bedroom and a shared rooftop terrace.",
    highlights: ["Close to tech hub", "Fully furnished", "Rooftop terrace", "Prepaid meter"],
    amenities: ["Borehole water", "Backup generator", "Elevator", "Security post", "Wi-Fi ready"],
    landlord: { name: "Mrs. Chioma Eze", role: "Verified Landlord", responseTime: "Usually replies within 4 hours" },
  },
  {
    id: "4-bedroom-terrace-ikoyi",
    img: propTerrace,
    gallery: [propTerrace, propDuplex, prop1Bed, propStudio],
    title: "4 Bedroom Terrace",
    location: "Ikoyi, Lagos",
    city: "Lagos",
    type: "Terrace",
    bedrooms: 4,
    priceValue: 4000000,
    price: "₦4,000,000",
    beds: "4 Beds",
    baths: "4 Baths",
    size: "310 sqm",
    furnishing: "Furnished",
    listedAt: 4,
    description:
      "An elegant 4 bedroom terrace in the heart of Ikoyi with a BQ, family lounge and landscaped courtyard. Perfect for families who want space without leaving the island.",
    highlights: ["Boys quarters", "Family lounge", "Landscaped courtyard", "Estate security"],
    amenities: ["Swimming pool access", "Gym", "Backup generator", "CCTV", "Treated water"],
    landlord: { name: "Mr. Tunde Bakare", role: "Verified Landlord", responseTime: "Usually replies within 1 hour" },
  },
  {
    id: "studio-apartment-surulere",
    img: propStudio,
    gallery: [propStudio, prop1Bed, propApartment, propApartmentVi],
    title: "Studio Apartment",
    location: "Surulere, Lagos",
    city: "Lagos",
    type: "Studio",
    bedrooms: 0,
    priceValue: 800000,
    price: "₦800,000",
    beds: "Studio",
    baths: "1 Bath",
    size: "42 sqm",
    furnishing: "Unfurnished",
    listedAt: 3,
    description:
      "A neat studio apartment ideal for young professionals. Well ventilated with large windows, a private bathroom and a compact kitchenette in a quiet residential street.",
    highlights: ["Great for singles", "Quiet street", "Prepaid meter", "Private bathroom"],
    amenities: ["Borehole water", "Security fence", "Kitchenette", "Parking space"],
    landlord: { name: "Mr. Segun Ola", role: "Verified Landlord", responseTime: "Usually replies within 6 hours" },
  },
  {
    id: "2-bedroom-apartment-victoria-island",
    img: propApartmentVi,
    gallery: [propApartmentVi, propApartment, prop1Bed, propStudio],
    title: "2 Bedroom Apartment",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    type: "Apartment",
    bedrooms: 2,
    priceValue: 1800000,
    price: "₦1,800,000",
    beds: "2 Beds",
    baths: "2 Baths",
    size: "110 sqm",
    furnishing: "Furnished",
    listedAt: 2,
    description:
      "A serviced 2 bedroom apartment in a premium Victoria Island tower, with concierge, elevator access and uninterrupted power. Walking distance to offices and restaurants.",
    highlights: ["Serviced apartment", "24/7 power", "Concierge", "Central location"],
    amenities: ["Elevator", "Gym", "Backup generator", "CCTV", "Covered parking"],
    landlord: { name: "Ivory Residences", role: "Verified Property Manager", responseTime: "Usually replies within 1 hour" },
  },
  {
    id: "1-bedroom-apartment-abuja",
    img: prop1Bed,
    gallery: [prop1Bed, propStudio, propApartment, propTerrace],
    title: "1 Bedroom Apartment",
    location: "Abuja, FCT",
    city: "Abuja",
    type: "Apartment",
    bedrooms: 1,
    priceValue: 1000000,
    price: "₦1,000,000",
    beds: "1 Bed",
    baths: "1 Bath",
    size: "58 sqm",
    furnishing: "Furnished",
    listedAt: 1,
    description:
      "A cosy furnished 1 bedroom apartment in a calm Abuja neighbourhood. Comes with a comfortable living area, fitted wardrobe and dedicated parking bay.",
    highlights: ["Furnished", "Dedicated parking", "Quiet neighbourhood", "Prepaid meter"],
    amenities: ["Borehole water", "Backup generator", "Air conditioning", "Security"],
    landlord: { name: "Mrs. Amina Yusuf", role: "Verified Landlord", responseTime: "Usually replies within 3 hours" },
  },
];

export const getPropertyById = (id: string) => allProperties.find((p) => p.id === id);
