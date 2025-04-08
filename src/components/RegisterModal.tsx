"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { CalendarIcon, Link2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DatePicker } from "./ui/datetime-picker";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (values: any) => Promise<void>;
}

interface UserFormValues {
  name: string;
  dob: string;
  gender: string;
  address: string;
  mobileNumber: string;
}

interface SubRegistrarFormValues {
  name: string;
  dob: string;
  gender: string;
  address: string;
  mobileNumber: string;
  departmentId: string;
  designation: string;
}

const userValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits"),
});

const subRegistrarValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be at least 10 digits"),
  departmentId: Yup.string().required("Department ID is required"),
  designation: Yup.string().required("Designation is required"),
});

const RegisterModal = ({
  isOpen,
  onClose,
  onRegister,
}: RegistrationFormProps) => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<"user" | "subRegistrar">("user");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userDate, setUserDate] = useState<Date | undefined>(undefined);
  const [subRegistrarDate, setSubRegistrarDate] = useState<Date | undefined>(
    undefined,
  );

  const userFormik = useFormik<UserFormValues>({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      address: "",
      mobileNumber: "",
    },
    validationSchema: userValidationSchema,
    onSubmit: async (values) => {
      if (!isConnected || !address) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onRegister({
          ...values,
          role: "USER",
        });
      } catch (error) {
        console.log("Registration error:", error);
        setIsSubmitting(false);
      }
    },
  });

  const subRegistrarFormik = useFormik<SubRegistrarFormValues>({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      address: "",
      mobileNumber: "",
      departmentId: "",
      designation: "",
    },
    validationSchema: subRegistrarValidationSchema,
    onSubmit: async (values) => {
      if (!isConnected || !address) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onRegister({
          ...values,
          role: "SUB_REGISTRAR",
        });
      } catch (error) {
        console.log("Registration error:", error);
        setIsSubmitting(false);
      }
    },
  });

  const linkAadhar = () => {
    userFormik.setValues({
      name: "Piyush",
      dob: "2004-12-08",
      gender: "Male",
      address:
        "420 z-wing, Happy Homes Society, J.M. road, Bhandup west, Mumbai 078",
      mobileNumber: "8928937191",
    });

    setUserDate(new Date("2004-12-08"));
  };

  useEffect(() => {
    if (userFormik.values.dob) {
      setUserDate(new Date(userFormik.values.dob));
    }
    if (subRegistrarFormik.values.dob) {
      setSubRegistrarDate(new Date(subRegistrarFormik.values.dob));
    }
  }, [userFormik.values.dob, subRegistrarFormik.values.dob]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Registration</DialogTitle>
          <DialogDescription className="text-center">
            Complete your registration to continue
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="user"
          className="w-full"
          onValueChange={(value) =>
            setActiveTab(value as "user" | "subRegistrar")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">Register as User</TabsTrigger>
            <TabsTrigger value="subRegistrar">
              Register as Sub-Registrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <form onSubmit={userFormik.handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    value={userFormik.values.name}
                    className={cn(
                      userFormik.touched.name && userFormik.errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {userFormik.touched.name && userFormik.errors.name && (
                    <p className="text-destructive text-sm">
                      {userFormik.errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    placeholder="Enter your mobile number"
                    onChange={userFormik.handleChange}
                    onBlur={userFormik.handleBlur}
                    value={userFormik.values.mobileNumber}
                    className={cn(
                      userFormik.touched.mobileNumber &&
                        userFormik.errors.mobileNumber
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {userFormik.touched.mobileNumber &&
                    userFormik.errors.mobileNumber && (
                      <p className="text-destructive text-sm">
                        {userFormik.errors.mobileNumber}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <DatePicker
                    value={userDate}
                    onChange={(newDate) => {
                      setUserDate(newDate);
                      if (newDate) {
                        const formattedDate = format(newDate, "yyyy-MM-dd");
                        userFormik.setFieldValue("dob", formattedDate);
                      } else {
                        userFormik.setFieldValue("dob", "");
                      }
                    }}
                    placeholder="Select date of birth"
                  />
                  {userFormik.touched.dob && userFormik.errors.dob && (
                    <p className="text-destructive text-sm">
                      {userFormik.errors.dob}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    onValueChange={(value) =>
                      userFormik.setFieldValue("gender", value)
                    }
                    value={userFormik.values.gender}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        userFormik.touched.gender && userFormik.errors.gender
                          ? "border-destructive focus-visible:ring-destructive"
                          : "",
                      )}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {userFormik.touched.gender && userFormik.errors.gender && (
                    <p className="text-destructive text-sm">
                      {userFormik.errors.gender}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Residential Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your residential address"
                  onChange={userFormik.handleChange}
                  onBlur={userFormik.handleBlur}
                  value={userFormik.values.address}
                  className={cn(
                    userFormik.touched.address && userFormik.errors.address
                      ? "border-destructive focus-visible:ring-destructive"
                      : "",
                  )}
                  rows={3}
                />
                {userFormik.touched.address && userFormik.errors.address && (
                  <p className="text-destructive text-sm">
                    {userFormik.errors.address}
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 w-full py-4"
                onClick={linkAadhar}
              >
                <Link2Icon className="mr-2 h-4 w-4" />
                Link my Aadhar
              </Button>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isConnected}
                  className={cn(
                    "w-full",
                    isSubmitting || !isConnected
                      ? "cursor-not-allowed opacity-70"
                      : "",
                    "bg-primary hover:bg-primary/90",
                  )}
                >
                  {isSubmitting ? "Processing..." : "Register as User"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="subRegistrar">
            <form
              onSubmit={subRegistrarFormik.handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Representative Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter representative name"
                    onChange={subRegistrarFormik.handleChange}
                    onBlur={subRegistrarFormik.handleBlur}
                    value={subRegistrarFormik.values.name}
                    className={cn(
                      subRegistrarFormik.touched.name &&
                        subRegistrarFormik.errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {subRegistrarFormik.touched.name &&
                    subRegistrarFormik.errors.name && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.name}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Official Contact Number</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    placeholder="Enter official contact number"
                    onChange={subRegistrarFormik.handleChange}
                    onBlur={subRegistrarFormik.handleBlur}
                    value={subRegistrarFormik.values.mobileNumber}
                    className={cn(
                      subRegistrarFormik.touched.mobileNumber &&
                        subRegistrarFormik.errors.mobileNumber
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {subRegistrarFormik.touched.mobileNumber &&
                    subRegistrarFormik.errors.mobileNumber && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.mobileNumber}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <DatePicker
                    value={subRegistrarDate}
                    onChange={(newDate) => {
                      setSubRegistrarDate(newDate);
                      if (newDate) {
                        const formattedDate = format(newDate, "yyyy-MM-dd");
                        subRegistrarFormik.setFieldValue("dob", formattedDate);
                      } else {
                        subRegistrarFormik.setFieldValue("dob", "");
                      }
                    }}
                    placeholder="Select date of birth"
                  />
                  {subRegistrarFormik.touched.dob &&
                    subRegistrarFormik.errors.dob && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.dob}
                      </p>
                    )}
                </div>
                <div className="w-full space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    onValueChange={(value) =>
                      userFormik.setFieldValue("gender", value)
                    }
                    value={userFormik.values.gender}
                  >
                    <SelectTrigger
                      className={cn(
                        "w-full",
                        userFormik.touched.gender && userFormik.errors.gender
                          ? "border-destructive focus-visible:ring-destructive"
                          : "",
                      )}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {subRegistrarFormik.touched.gender &&
                    subRegistrarFormik.errors.gender && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.gender}
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter office address"
                  onChange={subRegistrarFormik.handleChange}
                  onBlur={subRegistrarFormik.handleBlur}
                  value={subRegistrarFormik.values.address}
                  className={cn(
                    subRegistrarFormik.touched.address &&
                      subRegistrarFormik.errors.address
                      ? "border-destructive focus-visible:ring-destructive"
                      : "",
                  )}
                  rows={3}
                />
                {subRegistrarFormik.touched.address &&
                  subRegistrarFormik.errors.address && (
                    <p className="text-destructive text-sm">
                      {subRegistrarFormik.errors.address}
                    </p>
                  )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departmentId">Department ID</Label>
                  <Input
                    id="departmentId"
                    name="departmentId"
                    type="text"
                    placeholder="Enter department ID"
                    onChange={subRegistrarFormik.handleChange}
                    onBlur={subRegistrarFormik.handleBlur}
                    value={subRegistrarFormik.values.departmentId}
                    className={cn(
                      subRegistrarFormik.touched.departmentId &&
                        subRegistrarFormik.errors.departmentId
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {subRegistrarFormik.touched.departmentId &&
                    subRegistrarFormik.errors.departmentId && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.departmentId}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    type="text"
                    placeholder="Enter designation"
                    onChange={subRegistrarFormik.handleChange}
                    onBlur={subRegistrarFormik.handleBlur}
                    value={subRegistrarFormik.values.designation}
                    className={cn(
                      subRegistrarFormik.touched.designation &&
                        subRegistrarFormik.errors.designation
                        ? "border-destructive focus-visible:ring-destructive"
                        : "",
                    )}
                  />
                  {subRegistrarFormik.touched.designation &&
                    subRegistrarFormik.errors.designation && (
                      <p className="text-destructive text-sm">
                        {subRegistrarFormik.errors.designation}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isConnected}
                  className={cn(
                    "w-full",
                    isSubmitting || !isConnected
                      ? "cursor-not-allowed opacity-70"
                      : "",
                    "bg-primary hover:bg-primary/90",
                  )}
                >
                  {isSubmitting ? "Processing..." : "Register as Sub-Registrar"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
