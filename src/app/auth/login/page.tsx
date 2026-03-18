"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useWalletAuth, UserRole } from "~/lib/hooks/useWalletAuth";
import { cn } from "~/lib/utils";

const ROLE_COPY: Record<
  UserRole,
  {
    title: string;
    description: string;
    highlights: string[];
    accent: string;
    destination: string;
    payload: {
      name: string;
      dob: string;
      gender: string;
      address: string;
      mobileNumber: string;
      departmentId?: string;
      designation?: string;
    };
  }
> = {
  USER: {
    title: "Register as Citizen",
    description:
      "Track property verifications, upload deeds, and collaborate seamlessly with district authorities.",
    highlights: [
      "Smart status tracking",
      "Document vault",
      "Guided registry workflow",
    ],
    accent: "from-primary/90 via-primary/75 to-primary/60",
    destination: "/dashboard",
    payload: {
      name: "Guest Applicant",
      dob: "1990-01-01",
      gender: "Prefer not to say",
      address: "Sample Residence, Mumbai, Maharashtra",
      mobileNumber: "9000000000",
    },
  },
  SUB_REGISTRAR: {
    title: "Register as Sub-Registrar",
    description:
      "Manage appointments, validate deeds, and monitor caseloads with AI-assisted insights.",
    highlights: [
      "Intake & triage queues",
      "Evidence review workspace",
      "AI summaries",
    ],
    accent: "from-emerald-500 via-emerald-400 to-emerald-300",
    destination: "/authority/verifications",
    payload: {
      name: "Guest Sub-Registrar",
      dob: "1985-06-06",
      gender: "Prefer not to say",
      address: "District Registrar Office, Mumbai",
      mobileNumber: "9000000001",
      departmentId: "SR-001",
      designation: "Sub-Registrar",
    },
  },
};

const HIGHLIGHT_ICONS = [Shield, CheckCircle2];

export default function LoginPage() {
  const router = useRouter();
  const { user, registerUser, setRole, isLoading } = useWalletAuth();
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (hasRedirected || isLoading) return;
    if (user?.role === "SUB_REGISTRAR") {
      setHasRedirected(true);
      router.replace("/authority/verifications");
    } else if (user?.role === "USER") {
      setHasRedirected(true);
      router.replace("/dashboard");
    }
  }, [user, isLoading, router, hasRedirected]);

  const handleSelectRole = async (role: UserRole) => {
    if (pendingRole) return;
    setPendingRole(role);

    try {
      if (user && user.role === role) {
        setHasRedirected(true);
        router.push(ROLE_COPY[role].destination);
        return;
      }

      if (user && user.role !== role) {
        setRole(role);
        setHasRedirected(true);
        router.push(ROLE_COPY[role].destination);
        return;
      }

      const { payload } = ROLE_COPY[role];
      await registerUser({
        role,
        ...payload,
        departmentId: payload.departmentId ?? "",
        designation: payload.designation ?? "",
      });
      setHasRedirected(true);
      router.push(ROLE_COPY[role].destination);
    } finally {
      setPendingRole(null);
    }
  };

  return (
    <div className="bg-card/10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-foreground text-4xl font-semibold tracking-tight lg:text-5xl">
          Choose how you want to explore Bhurekha
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
          Instantly dive into a fully interactive workspace. No blockchain
          wallet or live database required — we keep everything in a secure
          local session so you can evaluate the interface end-to-end.
        </p>
      </div>

      <div className="mt-10 grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {(Object.keys(ROLE_COPY) as UserRole[]).map((role, index) => {
          const copy = ROLE_COPY[role];
          const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];

          return (
            <Card
              key={role}
              className={cn(
                "border-border/60 bg-card text-foreground border shadow-lg transition",
                "h-full",
              )}
            >
              <CardContent className="flex h-full flex-col justify-between gap-6 p-6 lg:p-8">
                <div className="space-y-3 text-left">
                  <div className="text-primary inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
                    <Icon className="h-3.5 w-3.5" />
                    {role === "USER"
                      ? "Citizen workspace"
                      : "Authority console"}
                  </div>
                  <h2 className="text-2xl font-semibold lg:text-3xl">
                    {copy.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {copy.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {copy.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-muted-foreground flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="bg-muted text-foreground inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  onClick={() => handleSelectRole(role)}
                  disabled={Boolean(pendingRole)}
                >
                  {pendingRole === role ? "Preparing workspace..." : copy.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-muted-foreground mt-6 text-center text-xs">
        Switching roles later is instant — we simply refresh the cached session
        and reroute you to the correct workspace.
      </p>
    </div>
  );
}
