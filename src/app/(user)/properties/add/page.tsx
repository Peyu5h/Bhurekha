"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Home,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Building,
  Ruler,
  IndianRupee,
  Landmark,
  Plus,
  FileText,
  Users,
  Upload,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { useWalletAuth } from "~/lib/hooks/useWalletAuth";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "~/components/ui/scroll-area";
import MapSelector from "~/components/property/MapSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

interface MaharashtraDistrict {
  id: string;
  name: string;
  talukas: string[];
}

interface PropertyDocuments {
  titleDeed: File | null;
  propertyTaxReceipt: File | null;
  seven12Extract: File | null;
  encumbranceCertificate: File | null;
  societyNOC: File | null;
  landSurveyCertificate: File | null;
  mutationEntries: File | null;
  naOrder: File | null;
  occupancyCertificate: File | null;
  reraCertificate: File | null;
  municipalApproval: File | null;
  landUsePermission: File | null;
}

export default function AddProperty() {
  const router = useRouter();
  const { user } = useWalletAuth();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    type: "land",
    subType: "",
    acquisitionSource: "",
    price: "",
    area: "",
    unitOfMeasurement: "sqft",
    yearBuilt: "",
    facing: "",

    // Location details
    location: "",
    address: "",
    district: "",
    taluka: "",
    village: "",
    city: "",
    state: "maharashtra",
    pincode: "",
    coordinates: { lat: 19.076, lng: 72.8777, address: "" },

    // Ownership details
    legalDetails: {
      ownershipType: "",
      titleDeedNumber: "",
      surveyNumber: "",
      seven12Extract: "",
      propertyCard: false,
      encumbrances: false,
      constructionApproved: false,
      boundaryDisputes: false,
      propertyTaxPaid: false,
      taxPaidUntil: new Date(),
      naviSharat: false,
      juniSharat: false,
    },

    // For rural/farm properties
    landDetails: {
      isFarmland: false,
      soilType: "",
      waterSource: "",
      cropHistory: "",
      farmStructures: false,
      landUsePermission: "",
      naClass: "",
    },

    // For apartments/buildings
    buildingDetails: {
      floors: "",
      units: "",
      amenities: [] as string[],
      parking: "",
      furnished: "",
      condition: "",
      ageOfBuilding: "",
      reraRegistered: false,
      reraNumber: "",
      occupancyCertificate: false,
    },

    // Documents
    documents: {
      titleDeed: null,
      propertyTaxReceipt: null,
      seven12Extract: null,
      encumbranceCertificate: null,
      societyNOC: null,
      landSurveyCertificate: null,
      mutationEntries: null,
      naOrder: null,
      occupancyCertificate: null,
      reraCertificate: null,
      municipalApproval: null,
      landUsePermission: null,
    } as PropertyDocuments,
  });

  // Maharashtra districts and talukas
  const [maharashtraDistricts] = useState<MaharashtraDistrict[]>([
    {
      id: "pune",
      name: "Pune",
      talukas: [
        "Pune City",
        "Haveli",
        "Mulshi",
        "Maval",
        "Khed",
        "Junnar",
        "Ambegaon",
        "Velhe",
        "Bhor",
        "Purandar",
        "Indapur",
        "Daund",
        "Baramati",
        "Shirur",
      ],
    },
    {
      id: "mumbai",
      name: "Mumbai City",
      talukas: ["Mumbai City", "Mumbai Suburban"],
    },
    {
      id: "thane",
      name: "Thane",
      talukas: [
        "Thane",
        "Kalyan",
        "Ambernath",
        "Ulhasnagar",
        "Bhiwandi",
        "Shahapur",
        "Murbad",
        "Dahanu",
        "Palghar",
        "Talasari",
        "Jawhar",
        "Mokhada",
        "Vada",
        "Vikramgad",
      ],
    },
    {
      id: "nagpur",
      name: "Nagpur",
      talukas: [
        "Nagpur Urban",
        "Nagpur Rural",
        "Kamptee",
        "Hingna",
        "Parseoni",
        "Ramtek",
        "Katol",
        "Narkhed",
        "Savner",
        "Kalmeshwar",
        "Umred",
        "Kuhi",
        "Bhiwapur",
        "Mouda",
      ],
    },
    {
      id: "nashik",
      name: "Nashik",
      talukas: [
        "Nashik",
        "Sinnar",
        "Igatpuri",
        "Dindori",
        "Peth",
        "Surgana",
        "Kalwan",
        "Baglan",
        "Malegaon",
        "Nandgaon",
        "Chandvad",
        "Deola",
        "Niphad",
        "Trimbakeshwar",
        "Yeola",
      ],
    },
  ]);

  const [talukas, setTalukas] = useState<string[]>([]);

  const totalSteps = 5;

  useEffect(() => {
    if (propertyData.district) {
      const district = maharashtraDistricts.find(
        (d) => d.id === propertyData.district,
      );
      if (district) {
        setTalukas(district.talukas);
      }
    }
  }, [propertyData.district, maharashtraDistricts]);

  const handleChange = (field: string, value: string | boolean | number) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setPropertyData((prev) => {
      const parentObj = prev[parent as keyof typeof prev];
      if (typeof parentObj === "object" && parentObj !== null) {
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [field]: value,
          },
        };
      }
      return prev;
    });
  };

  const handleDocumentUpload = (documentType: string, file: File | null) => {
    setPropertyData((prev) => {
      const documents = { ...prev.documents };
      documents[documentType as keyof typeof documents] = file;
      return {
        ...prev,
        documents,
      };
    });
  };

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setPropertyData((prev) => ({
      ...prev,
      coordinates: location,
      address: location.address,
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    toast.success("Property submitted for verification");
    router.push("/properties");
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex h-full flex-grow flex-col space-y-8">
            <div className="grid flex-grow grid-cols-2 gap-2 md:grid-cols-2">
              <Card
                className={cn(
                  "hover:border-primary/50 cursor-pointer transition-all",
                  propertyData.type === "land" &&
                    "border-primary/80 bg-primary/5",
                )}
                onClick={() => handleChange("type", "land")}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div
                    className={cn(
                      "bg-muted mb-4 rounded-full p-4",
                      propertyData.type === "land" && "bg-primary/20",
                    )}
                  >
                    <Landmark
                      className={cn(
                        "h-8 w-8",
                        propertyData.type === "land"
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <h3 className="mb-1 text-base font-medium">Land / Plot</h3>
                  <p className="text-muted-foreground text-xs">
                    Agricultural, residential, or commercial plots
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "hover:border-primary/50 cursor-pointer transition-all",
                  propertyData.type === "farm" &&
                    "border-primary/80 bg-primary/5",
                )}
                onClick={() => handleChange("type", "farm")}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div
                    className={cn(
                      "bg-muted mb-4 rounded-full p-4",
                      propertyData.type === "farm" && "bg-primary/20",
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={cn(
                        "h-8 w-8",
                        propertyData.type === "farm"
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      <path
                        d="M4 14C4 15.1046 3.10457 16 2 16V22H22V16C20.8954 16 20 15.1046 20 14V8C20 5.23858 17.7614 3 15 3H9C6.23858 3 4 5.23858 4 8V14Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 16V22"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 22L8 19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 22L16 19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-1 text-base font-medium">Farm</h3>
                  <p className="text-muted-foreground text-xs">
                    Agricultural land with farming facilities
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "hover:border-primary/50 cursor-pointer transition-all",
                  propertyData.type === "flat" &&
                    "border-primary/80 bg-primary/5",
                )}
                onClick={() => handleChange("type", "flat")}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div
                    className={cn(
                      "bg-muted mb-4 rounded-full p-4",
                      propertyData.type === "flat" && "bg-primary/20",
                    )}
                  >
                    <Building
                      className={cn(
                        "h-8 w-8",
                        propertyData.type === "flat"
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <h3 className="mb-1 text-base font-medium">
                    Flat / Apartment
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Residential units in multi-story buildings
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "hover:border-primary/50 cursor-pointer transition-all",
                  propertyData.type === "house" &&
                    "border-primary/80 bg-primary/5",
                )}
                onClick={() => handleChange("type", "house")}
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <div
                    className={cn(
                      "bg-muted mb-4 rounded-full p-4",
                      propertyData.type === "house" && "bg-primary/20",
                    )}
                  >
                    <Home
                      className={cn(
                        "h-8 w-8",
                        propertyData.type === "house"
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <h3 className="mb-1 text-base font-medium">House / Villa</h3>
                  <p className="text-muted-foreground text-xs">
                    Independent houses and luxury villas
                  </p>
                </CardContent>
              </Card>
            </div>

            {propertyData.type && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="subType"
                      className="mb-2 block text-sm font-medium"
                    >
                      Property Subtype
                    </label>
                    <Select
                      value={propertyData.subType}
                      onValueChange={(value) => handleChange("subType", value)}
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select subtype" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyData.type === "flat" && (
                          <>
                            <SelectItem value="1bhk">1 BHK</SelectItem>
                            <SelectItem value="2bhk">2 BHK</SelectItem>
                            <SelectItem value="3bhk">3 BHK</SelectItem>
                            <SelectItem value="4bhk">4+ BHK</SelectItem>
                          </>
                        )}
                        {propertyData.type === "house" && (
                          <>
                            <SelectItem value="bungalow">Bungalow</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="row_house">Row House</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="farmhouse">Farmhouse</SelectItem>
                          </>
                        )}
                        {propertyData.type === "land" && (
                          <>
                            <SelectItem value="residential">
                              Residential Land
                            </SelectItem>
                            <SelectItem value="commercial">
                              Commercial Land
                            </SelectItem>
                            <SelectItem value="industrial">
                              Industrial Land
                            </SelectItem>
                            <SelectItem value="na_plot">NA Plot</SelectItem>
                          </>
                        )}
                        {propertyData.type === "farm" && (
                          <>
                            <SelectItem value="agricultural">
                              Agricultural Land
                            </SelectItem>
                            <SelectItem value="orchard">
                              Orchard/Plantation
                            </SelectItem>
                            <SelectItem value="poultry">
                              Poultry/Dairy Farm
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="acquisitionSource"
                      className="mb-2 block text-sm font-medium"
                    >
                      Acquisition Source
                    </label>
                    <Select
                      value={propertyData.acquisitionSource}
                      onValueChange={(value) =>
                        handleChange("acquisitionSource", value)
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Seller</SelectItem>
                        <SelectItem value="builder">
                          Builder/Developer
                        </SelectItem>
                        <SelectItem value="government">
                          Government Auction
                        </SelectItem>
                        <SelectItem value="bank">Bank Auction</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 2: // Property Details
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium"
                >
                  Property Title
                </label>
                <Input
                  id="title"
                  placeholder={
                    propertyData.type === "land"
                      ? "e.g. Residential Plot near Hinjewadi"
                      : "e.g. 3BHK Apartment in Koregaon Park"
                  }
                  value={propertyData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your property..."
                  rows={3}
                  value={propertyData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="min-h-[72px] resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="area"
                  className="mb-2 block text-sm font-medium"
                >
                  Area
                </label>
                <div className="flex">
                  <Input
                    id="area"
                    type="number"
                    placeholder={
                      propertyData.type === "land" ||
                      propertyData.type === "farm"
                        ? "e.g. 10000"
                        : "e.g. 1200"
                    }
                    value={propertyData.area}
                    onChange={(e) => handleChange("area", e.target.value)}
                    className="h-11 rounded-r-none"
                  />
                  <Select
                    value={propertyData.unitOfMeasurement}
                    onValueChange={(value) =>
                      handleChange("unitOfMeasurement", value)
                    }
                  >
                    <SelectTrigger
                      style={{ height: "2.75rem" }}
                      className="w-[80px] rounded-l-none border-l-0 py-4 [&]:h-11"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(propertyData.type === "flat" ||
                        propertyData.type === "house") && (
                        <>
                          <SelectItem value="sqft">sq.ft</SelectItem>
                          <SelectItem value="sqm">sq.m</SelectItem>
                        </>
                      )}
                      {(propertyData.type === "land" ||
                        propertyData.type === "farm") && (
                        <>
                          <SelectItem value="sqft">sq.ft</SelectItem>
                          <SelectItem value="sqm">sq.m</SelectItem>
                          <SelectItem value="acre">acre</SelectItem>
                          <SelectItem value="hectare">ha</SelectItem>
                          <SelectItem value="guntha">guntha</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium"
                >
                  Price (₹)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IndianRupee className="text-muted-foreground h-4 w-4" />
                  </div>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g. 5000000"
                    value={propertyData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="yearBuilt"
                  className="mb-2 block text-sm font-medium"
                >
                  Year Built
                </label>
                <Input
                  id="yearBuilt"
                  placeholder="e.g. 2015"
                  value={propertyData.yearBuilt}
                  onChange={(e) => handleChange("yearBuilt", e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            {propertyData.type === "land" && (
              <div className="border-muted bg-muted/5 mt-6 rounded-lg border p-5">
                <h3 className="mb-4 text-sm font-medium">Land Details</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="landCategory"
                      className="mb-2 block text-sm font-medium"
                    >
                      Land Category
                    </label>
                    <div className="space-y-3">
                      <div
                        className={cn(
                          "cursor-pointer rounded-lg border p-3 transition-all",
                          propertyData.legalDetails.naviSharat
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-muted/80",
                        )}
                        onClick={() => {
                          handleNestedChange(
                            "legalDetails",
                            "naviSharat",
                            true,
                          );
                          handleNestedChange(
                            "legalDetails",
                            "juniSharat",
                            false,
                          );
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border",
                              propertyData.legalDetails.naviSharat
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted bg-muted",
                            )}
                          >
                            {propertyData.legalDetails.naviSharat && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                          <Label htmlFor="naviSharat" className="text-sm">
                            Navi Sharat (Class II)
                          </Label>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "cursor-pointer rounded-lg border p-3 transition-all",
                          propertyData.legalDetails.juniSharat
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-muted/80",
                        )}
                        onClick={() => {
                          handleNestedChange(
                            "legalDetails",
                            "naviSharat",
                            false,
                          );
                          handleNestedChange(
                            "legalDetails",
                            "juniSharat",
                            true,
                          );
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border",
                              propertyData.legalDetails.juniSharat
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted bg-muted",
                            )}
                          >
                            {propertyData.legalDetails.juniSharat && (
                              <CheckCircle2 className="h-3 w-3" />
                            )}
                          </div>
                          <Label htmlFor="juniSharat" className="text-sm">
                            Juni Sharat (Class I)
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="naClass"
                      className="mb-2 block text-sm font-medium"
                    >
                      N.A. Status
                    </label>
                    <Select
                      value={propertyData.landDetails.naClass}
                      onValueChange={(value) =>
                        handleNestedChange("landDetails", "naClass", value)
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="na_approved">NA Approved</SelectItem>
                        <SelectItem value="agricultural">
                          Agricultural
                        </SelectItem>
                        <SelectItem value="na_in_process">
                          NA in Process
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="landUsePermission"
                      className="mb-2 block text-sm font-medium"
                    >
                      Land Use Permission
                    </label>
                    <Select
                      value={propertyData.landDetails.landUsePermission}
                      onValueChange={(value) =>
                        handleNestedChange(
                          "landDetails",
                          "landUsePermission",
                          value,
                        )
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select use" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="mixed">Mixed Use</SelectItem>
                        <SelectItem value="agricultural">
                          Agricultural
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {propertyData.type === "farm" && (
              <div className="border-muted bg-muted/5 mt-6 rounded-lg border p-5">
                <h3 className="mb-4 text-sm font-medium">Farm Details</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="soilType"
                      className="mb-2 block text-sm font-medium"
                    >
                      Soil Type
                    </label>
                    <Select
                      value={propertyData.landDetails.soilType}
                      onValueChange={(value) =>
                        handleNestedChange("landDetails", "soilType", value)
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="black">Black Soil</SelectItem>
                        <SelectItem value="red">Red Soil</SelectItem>
                        <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                        <SelectItem value="laterite">Laterite Soil</SelectItem>
                        <SelectItem value="mixed">Mixed Soil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="waterSource"
                      className="mb-2 block text-sm font-medium"
                    >
                      Water Source
                    </label>
                    <Select
                      value={propertyData.landDetails.waterSource}
                      onValueChange={(value) =>
                        handleNestedChange("landDetails", "waterSource", value)
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select water source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="canal">Canal</SelectItem>
                        <SelectItem value="river">River</SelectItem>
                        <SelectItem value="rainwater">Rainwater</SelectItem>
                        <SelectItem value="none">No Source</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex h-full w-full cursor-pointer items-center rounded-lg border p-3 transition-all",
                        propertyData.landDetails.farmStructures
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-muted/80",
                      )}
                      onClick={() =>
                        handleNestedChange(
                          "landDetails",
                          "farmStructures",
                          !propertyData.landDetails.farmStructures,
                        )
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            propertyData.landDetails.farmStructures
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted bg-muted",
                          )}
                        >
                          {propertyData.landDetails.farmStructures && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </div>
                        <label className="text-sm">Has farm structures</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {propertyData.type === "flat" && (
              <div className="border-muted bg-muted/5 mt-6 rounded-lg border p-5">
                <h3 className="mb-4 text-sm font-medium">Flat Details</h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label
                      htmlFor="floors"
                      className="mb-2 block text-sm font-medium"
                    >
                      Floor Number
                    </label>
                    <Input
                      id="floors"
                      type="number"
                      placeholder="e.g. 5"
                      value={propertyData.buildingDetails.floors}
                      onChange={(e) =>
                        handleNestedChange(
                          "buildingDetails",
                          "floors",
                          e.target.value,
                        )
                      }
                      className="h-11"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="condition"
                      className="mb-2 block text-sm font-medium"
                    >
                      Property Condition
                    </label>
                    <Select
                      value={propertyData.buildingDetails.condition}
                      onValueChange={(value) =>
                        handleNestedChange(
                          "buildingDetails",
                          "condition",
                          value,
                        )
                      }
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ready_to_move">
                          Ready to Move
                        </SelectItem>
                        <SelectItem value="under_construction">
                          Under Construction
                        </SelectItem>
                        <SelectItem value="needs_renovation">
                          Needs Renovation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div
                      className={cn(
                        "cursor-pointer rounded-lg border p-3 transition-all",
                        propertyData.buildingDetails.reraRegistered
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-muted/80",
                      )}
                      onClick={() =>
                        handleNestedChange(
                          "buildingDetails",
                          "reraRegistered",
                          !propertyData.buildingDetails.reraRegistered,
                        )
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            propertyData.buildingDetails.reraRegistered
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted bg-muted",
                          )}
                        >
                          {propertyData.buildingDetails.reraRegistered && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </div>
                        <label className="text-sm">RERA registered</label>
                      </div>
                    </div>

                    <div
                      className={cn(
                        "cursor-pointer rounded-lg border p-3 transition-all",
                        propertyData.buildingDetails.occupancyCertificate
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-muted/80",
                      )}
                      onClick={() =>
                        handleNestedChange(
                          "buildingDetails",
                          "occupancyCertificate",
                          !propertyData.buildingDetails.occupancyCertificate,
                        )
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            propertyData.buildingDetails.occupancyCertificate
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted bg-muted",
                          )}
                        >
                          {propertyData.buildingDetails
                            .occupancyCertificate && (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                        </div>
                        <label className="text-sm">
                          Has Occupancy Certificate
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );

      case 3: // Location
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-6"
          >
            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-1">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="district"
                      className="mb-2 block text-sm font-medium"
                    >
                      District
                    </label>
                    <Select
                      value={propertyData.district}
                      onValueChange={(value) => {
                        handleChange("district", value);
                        handleChange("taluka", "");
                      }}
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {maharashtraDistricts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label
                      htmlFor="taluka"
                      className="mb-2 block text-sm font-medium"
                    >
                      Taluka
                    </label>
                    <Select
                      value={propertyData.taluka}
                      onValueChange={(value) => handleChange("taluka", value)}
                      disabled={!propertyData.district}
                    >
                      <SelectTrigger
                        style={{ height: "2.75rem" }}
                        className="h-11"
                      >
                        <SelectValue
                          placeholder={
                            propertyData.district
                              ? "Select taluka"
                              : "Select district first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {talukas.map((taluka) => (
                          <SelectItem key={taluka} value={taluka}>
                            {taluka}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {(propertyData.type === "land" ||
                    propertyData.type === "farm") && (
                    <div>
                      <label
                        htmlFor="village"
                        className="mb-2 block text-sm font-medium"
                      >
                        Village
                      </label>
                      <Input
                        id="village"
                        placeholder="Village name"
                        value={propertyData.village}
                        onChange={(e) =>
                          handleChange("village", e.target.value)
                        }
                        className="h-11"
                      />
                    </div>
                  )}

                  {(propertyData.type === "flat" ||
                    propertyData.type === "house") && (
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium"
                      >
                        City/Town
                      </label>
                      <Input
                        id="city"
                        placeholder="City name"
                        value={propertyData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="pincode"
                      className="mb-2 block text-sm font-medium"
                    >
                      PIN Code
                    </label>
                    <Input
                      id="pincode"
                      placeholder="PIN code"
                      value={propertyData.pincode}
                      onChange={(e) => handleChange("pincode", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium"
                  >
                    Complete Address
                  </label>
                  <Textarea
                    id="address"
                    placeholder="Full property address"
                    rows={5}
                    value={propertyData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:col-span-2 md:h-full">
                <label className="mb-2 block text-sm font-medium">
                  Map Location
                </label>
                <p className="text-muted-foreground mb-2 text-xs">
                  Search for a location or click on the map to place a pin.
                </p>
                <div className="h-[400px] flex-grow md:h-[500px]">
                  <MapSelector
                    onLocationSelect={handleLocationSelect}
                    initialLocation={propertyData.coordinates}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Legal Information
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label
                  htmlFor="ownershipType"
                  className="mb-2 block text-sm font-medium"
                >
                  Ownership Type
                </label>
                <Select
                  value={propertyData.legalDetails.ownershipType}
                  onValueChange={(value) =>
                    handleNestedChange("legalDetails", "ownershipType", value)
                  }
                >
                  <SelectTrigger style={{ height: "2.75rem" }} className="h-11">
                    <SelectValue placeholder="Select ownership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freehold">Freehold</SelectItem>
                    <SelectItem value="leasehold">Leasehold</SelectItem>
                    <SelectItem value="cooperative">
                      Cooperative Society
                    </SelectItem>
                    <SelectItem value="powerOfAttorney">
                      Power of Attorney
                    </SelectItem>
                    <SelectItem value="ancestral">
                      Ancestral Property
                    </SelectItem>
                    <SelectItem value="governmentAllotted">
                      Government Allotted
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="titleDeedNumber"
                  className="mb-2 block text-sm font-medium"
                >
                  {propertyData.type === "flat"
                    ? "Agreement Number"
                    : "Title Deed Number"}
                </label>
                <Input
                  id="titleDeedNumber"
                  placeholder="Enter deed number"
                  value={propertyData.legalDetails.titleDeedNumber}
                  onChange={(e) =>
                    handleNestedChange(
                      "legalDetails",
                      "titleDeedNumber",
                      e.target.value,
                    )
                  }
                  className="h-11"
                />
              </div>

              <div>
                <label
                  htmlFor="surveyNumber"
                  className="mb-2 block text-sm font-medium"
                >
                  {propertyData.type === "land" || propertyData.type === "farm"
                    ? "Survey / Gat Number"
                    : "Property ID"}
                </label>
                <Input
                  id="surveyNumber"
                  placeholder="Enter survey number"
                  value={propertyData.legalDetails.surveyNumber}
                  onChange={(e) =>
                    handleNestedChange(
                      "legalDetails",
                      "surveyNumber",
                      e.target.value,
                    )
                  }
                  className="h-11"
                />
              </div>
            </div>

            {(propertyData.type === "land" || propertyData.type === "farm") && (
              <div>
                <label
                  htmlFor="seven12Extract"
                  className="mb-2 block text-sm font-medium"
                >
                  7/12 Extract Number
                </label>
                <Input
                  id="seven12Extract"
                  placeholder="Enter 7/12 extract number"
                  value={propertyData.legalDetails.seven12Extract}
                  onChange={(e) =>
                    handleNestedChange(
                      "legalDetails",
                      "seven12Extract",
                      e.target.value,
                    )
                  }
                  className="h-11"
                />
              </div>
            )}

            <div className="border-muted bg-muted/5 rounded-lg border p-5">
              <h3 className="mb-4 text-sm font-medium">Property Tax Status</h3>
              <div
                className={cn(
                  "mb-6 cursor-pointer rounded-lg border p-4 transition-all",
                  propertyData.legalDetails.propertyTaxPaid
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-muted/80",
                )}
                onClick={() =>
                  handleNestedChange(
                    "legalDetails",
                    "propertyTaxPaid",
                    !propertyData.legalDetails.propertyTaxPaid,
                  )
                }
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border",
                      propertyData.legalDetails.propertyTaxPaid
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted bg-muted",
                    )}
                  >
                    {propertyData.legalDetails.propertyTaxPaid && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      Property tax is fully paid and up-to-date
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      All property tax payments are current with no outstanding
                      dues
                    </p>
                  </div>
                </div>

                {propertyData.legalDetails.propertyTaxPaid && (
                  <div className="mt-4 ml-9">
                    <label
                      htmlFor="taxPaidUntil"
                      className="mb-2 block text-xs font-medium"
                    >
                      Tax Paid Until:
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 w-[200px] justify-start text-left font-normal"
                        >
                          {date ? format(date, "PP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </div>

            <div className="border-muted bg-muted/5 rounded-lg border p-5">
              <h3 className="mb-4 text-sm font-medium">Legal Status</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 transition-all",
                    propertyData.legalDetails.encumbrances
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted/80",
                  )}
                  onClick={() =>
                    handleNestedChange(
                      "legalDetails",
                      "encumbrances",
                      !propertyData.legalDetails.encumbrances,
                    )
                  }
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border",
                        propertyData.legalDetails.encumbrances
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-muted",
                      )}
                    >
                      {propertyData.legalDetails.encumbrances && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Property has encumbrances
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        Includes loans, mortgages, liens or other financial
                        obligations tied to the property
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "cursor-pointer rounded-lg border p-4 transition-all",
                    propertyData.legalDetails.constructionApproved
                      ? "border-primary bg-primary/5"
                      : "border-muted hover:border-muted/80",
                  )}
                  onClick={() =>
                    handleNestedChange(
                      "legalDetails",
                      "constructionApproved",
                      !propertyData.legalDetails.constructionApproved,
                    )
                  }
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border",
                        propertyData.legalDetails.constructionApproved
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted bg-muted",
                      )}
                    >
                      {propertyData.legalDetails.constructionApproved && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        Construction is approved by authorities
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        All necessary approvals and NOCs are in place from local
                        authorities
                      </p>
                    </div>
                  </div>
                </div>

                {(propertyData.type === "flat" ||
                  propertyData.type === "house") && (
                  <div
                    className={cn(
                      "cursor-pointer rounded-lg border p-4 transition-all",
                      propertyData.legalDetails.propertyCard
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted/80",
                    )}
                    onClick={() =>
                      handleNestedChange(
                        "legalDetails",
                        "propertyCard",
                        !propertyData.legalDetails.propertyCard,
                      )
                    }
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border",
                          propertyData.legalDetails.propertyCard
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-muted",
                        )}
                      >
                        {propertyData.legalDetails.propertyCard && (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Property has a property card
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          Official property card issued by the local municipal
                          authority is available
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 5: // Documents
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border-muted bg-muted/5 rounded-lg border p-5">
                <div className="mb-5 flex items-center">
                  <Shield className="text-primary mr-3 h-5 w-5" />
                  <h3 className="text-base font-medium">Required Documents</h3>
                </div>

                <div className="space-y-4">
                  <div className="overflow-hidden rounded-md border">
                    <div className="bg-background flex items-center justify-between border-b p-3">
                      <div className="flex items-center">
                        <FileText className="text-primary mr-3 h-5 w-5" />
                        <span className="text-sm font-medium">
                          {propertyData.type === "flat"
                            ? "Agreement/Sale Deed"
                            : "Title Deed"}
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center text-xs">
                        <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-medium text-orange-800">
                          Required
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted/5 flex items-center justify-between p-3">
                      <div className="text-muted-foreground text-sm">
                        {propertyData.documents.titleDeed
                          ? "1 file uploaded"
                          : "No file uploaded yet"}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 gap-1 text-xs"
                      >
                        <Upload className="mr-1 h-3.5 w-3.5" /> Upload
                      </Button>
                    </div>
                  </div>

                  {(propertyData.type === "land" ||
                    propertyData.type === "farm") && (
                    <div className="overflow-hidden rounded-md border">
                      <div className="bg-background flex items-center justify-between border-b p-3">
                        <div className="flex items-center">
                          <FileText className="text-primary mr-3 h-5 w-5" />
                          <span className="text-sm font-medium">
                            7/12 Extract (Satbara)
                          </span>
                        </div>
                        <div className="text-muted-foreground flex items-center text-xs">
                          <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-medium text-orange-800">
                            Required
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted/5 flex items-center justify-between p-3">
                        <div className="text-muted-foreground text-sm">
                          {propertyData.documents.seven12Extract
                            ? "1 file uploaded"
                            : "No file uploaded yet"}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 gap-1 text-xs"
                        >
                          <Upload className="mr-1 h-3.5 w-3.5" /> Upload
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Property tax receipt */}
                  <div className="overflow-hidden rounded-md border">
                    <div className="bg-background flex items-center justify-between border-b p-3">
                      <div className="flex items-center">
                        <FileText className="text-primary mr-3 h-5 w-5" />
                        <span className="text-sm font-medium">
                          Property Tax Receipt
                        </span>
                      </div>
                      <div className="text-muted-foreground flex items-center text-xs">
                        <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-medium text-orange-800">
                          Required
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted/5 flex items-center justify-between p-3">
                      <div className="text-muted-foreground text-sm">
                        {propertyData.documents.propertyTaxReceipt
                          ? "1 file uploaded"
                          : "No file uploaded yet"}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 gap-1 text-xs"
                      >
                        <Upload className="mr-1 h-3.5 w-3.5" /> Upload
                      </Button>
                    </div>
                  </div>

                  {/* Encumbrance Certificate */}
                  {propertyData.legalDetails.encumbrances && (
                    <div className="overflow-hidden rounded-md border">
                      <div className="bg-background flex items-center justify-between border-b p-3">
                        <div className="flex items-center">
                          <FileText className="text-primary mr-3 h-5 w-5" />
                          <span className="text-sm font-medium">
                            Encumbrance Certificate
                          </span>
                        </div>
                        <div className="text-muted-foreground flex items-center text-xs">
                          <span className="inline-block rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-medium text-orange-800">
                            Required
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted/5 flex items-center justify-between p-3">
                        <div className="text-muted-foreground text-sm">
                          {propertyData.documents.encumbranceCertificate
                            ? "1 file uploaded"
                            : "No file uploaded yet"}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 gap-1 text-xs"
                        >
                          <Upload className="mr-1 h-3.5 w-3.5" /> Upload
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-muted bg-muted/5 rounded-lg border p-5">
                  <div className="mb-4 flex items-center">
                    <Users className="text-primary mr-3 h-5 w-5" />
                    <h3 className="text-base font-medium">Property Photos</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="group bg-muted/50 hover:bg-muted/80 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors"
                      >
                        <div className="bg-background/80 flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-transform group-hover:scale-110">
                          <Plus className="text-muted-foreground h-6 w-6" />
                        </div>
                        <span className="text-muted-foreground mt-2 text-xs">
                          Add Photo {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-primary/20 bg-primary/5 rounded-lg border p-5">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="text-primary mt-0.5 h-6 w-6" />
                    <div>
                      <h3 className="text-base font-medium">
                        Ready to Submit?
                      </h3>
                      <p className="text-muted-foreground mt-2 text-sm">
                        Once submitted, our team will verify your property
                        information within 2-3 business days.
                      </p>

                      <div className="mt-4 flex items-center">
                        <Checkbox id="terms" className="mr-2 h-4 w-4" />
                        <label htmlFor="terms" className="text-xs">
                          I confirm all information provided is accurate and
                          complete
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const renderStepTitle = () => {
    switch (step) {
      case 1:
        return {
          title: "Property Details",
          description: "Basic information about your property",
          icon: <Home className="h-5 w-5" />,
        };
      case 2:
        return {
          title: "Property Details",
          description: "Basic property information",
          icon: <Home className="h-5 w-5" />,
        };
      case 3:
        return {
          title: "Location Information",
          description: "Address and location details",
          icon: <MapPin className="h-5 w-5" />,
        };
      case 4:
        return {
          title: "Legal Information",
          description: "Ownership and legal details",
          icon: <Building className="h-5 w-5" />,
        };
      case 5:
        return {
          title: "Documents",
          description: "Upload necessary documents and photos",
          icon: <FileText className="h-5 w-5" />,
        };
      default:
        return {
          title: "",
          description: "",
          icon: null,
        };
    }
  };

  const { title, description, icon } = renderStepTitle();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="bg-muted/10 hidden border-r md:flex md:w-1/5 lg:w-1/6">
        <div className="w-full">
          <ScrollArea className="h-screen py-6">
            <div className="mb-4 px-4">
              <h2 className="text-lg font-semibold">Add Property</h2>
              <p className="text-muted-foreground text-xs md:mb-12"></p>
            </div>
            <div className="relative">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === step;
                const isCompleted = stepNum < step;

                return (
                  <motion.button
                    key={stepNum}
                    type="button"
                    className={cn(
                      "relative mb-6 flex w-full items-start px-4 text-left",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setStep(stepNum)}
                  >
                    <div
                      className={cn(
                        "z-10 mr-3 flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : isCompleted
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    <div className="z-10">
                      <div className="text-sm font-medium">
                        {stepNum === 1 && "Property Type"}
                        {stepNum === 2 && "Property Details"}
                        {stepNum === 3 && "Location"}
                        {stepNum === 4 && "Legal"}
                        {stepNum === 5 && "Documents"}
                      </div>
                      <p className="text-muted-foreground mt-0.5 hidden text-xs lg:block">
                        {stepNum === 1 && "Select property type"}
                        {stepNum === 2 && "Basic information"}
                        {stepNum === 3 && "Address & location"}
                        {stepNum === 4 && "Legal details"}
                        {stepNum === 5 && "Document upload"}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <div className="bg-background flex items-center justify-between border-b p-4">
          <div className="flex items-center space-x-3">
            {step === 1 && <Home className="text-primary h-5 w-5" />}
            {step === 2 && <Landmark className="text-primary h-5 w-5" />}
            {step === 3 && <MapPin className="text-primary h-5 w-5" />}
            {step === 4 && <FileText className="text-primary h-5 w-5" />}
            {step === 5 && <Upload className="text-primary h-5 w-5" />}
            <div>
              <h1 className="text-lg font-semibold">
                {step === 1 && "Property Type"}
                {step === 2 && "Property Details"}
                {step === 3 && "Location Information"}
                {step === 4 && "Legal Information"}
                {step === 5 && "Documents"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {step === 1 && "Select your property type"}
                {step === 2 && "Basic property information"}
                {step === 3 && "Address and location details"}
                {step === 4 && "Legal and ownership information"}
                {step === 5 && "Upload required documents"}
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllDetails(!showAllDetails)}
            >
              {showAllDetails ? "Hide Steps" : "Show Steps"}
            </Button>
          </div>
        </div>

        {showAllDetails && (
          <div className="overflow-auto border-b md:hidden">
            <div className="flex gap-2 p-3">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === step;
                const isCompleted = stepNum < step;

                return (
                  <button
                    key={stepNum}
                    type="button"
                    className={cn(
                      "flex min-w-[80px] flex-col items-center rounded-lg p-2",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setStep(stepNum)}
                  >
                    <div
                      className={cn(
                        "mb-1 flex h-6 w-6 items-center justify-center rounded-full",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-primary/80 text-primary-foreground"
                            : "bg-muted",
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span className="text-xs whitespace-nowrap">
                      {stepNum === 1 && "Type"}
                      {stepNum === 2 && "Details"}
                      {stepNum === 3 && "Location"}
                      {stepNum === 4 && "Legal"}
                      {stepNum === 5 && "Documents"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="flex min-h-full flex-col p-4">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </div>
        </div>

        <div className="bg-muted/20 flex items-center justify-between border-t p-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1}
            className="gap-1"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {step < totalSteps ? (
            <Button onClick={nextStep} className="gap-1" size="sm">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-1" size="sm">
              Submit for Verification <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
