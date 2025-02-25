"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import useSWR, { mutate } from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Printer, Loader2 } from "lucide-react";
import { MDMUResponse } from "../mdmu/components/mdmu-form/types";

// Move status color mapping outside component to prevent recreation
const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
} as const;

const ALL_OPTION = "all";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data.results || [];
};

export default function AdminPage() {
  const [selectedApplication, setSelectedApplication] =
    useState<MDMUResponse | null>(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [filters, setFilters] = useState({
    company: "",
    category: "",
    status: "",
  });

  const {
    data: applications = [],
    error,
    isLoading,
  } = useSWR<MDMUResponse[]>(
    "https://cim.baliyoventures.com/api/mdmu/mero-desh-merai-utpadan/",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
    }
  );

  // Memoize unique categories
  const uniqueCategories = useMemo(() => {
    if (!Array.isArray(applications)) return [];
    return Array.from(
      new Set(
        applications
          .map(
            (app) => app.nature_of_industry_sub_category_detail?.category?.name
          )
          .filter(Boolean)
      )
    );
  }, [applications]);

  // Memoize filtered applications
  const filteredApplications = useMemo(() => {
    if (!Array.isArray(applications)) return [];

    return applications.filter((app) => {
      if (!app) return false;

      const companyMatch =
        !filters.company ||
        app.name_of_company
          ?.toLowerCase()
          .includes(filters.company.toLowerCase().trim());

      const categoryMatch =
        filters.category === ALL_OPTION ||
        !filters.category ||
        app.nature_of_industry_sub_category_detail?.category?.name?.toLowerCase() ===
          filters.category.toLowerCase().trim();

      const statusMatch =
        filters.status === ALL_OPTION ||
        !filters.status ||
        app.status?.toLowerCase() === filters.status.toLowerCase().trim();

      return companyMatch && categoryMatch && statusMatch;
    });
  }, [applications, filters]);

  // Memoize handlers
  const handleStatusUpdate = useCallback(
    async (status: "Pending" | "Approved" | "Rejected") => {
      if (!selectedApplication) return;

      setStatusUpdateLoading(true);
      try {
        const response = await fetch(
          `https://cim.baliyoventures.com/api/mdmu/${selectedApplication.id}/status/?status=${status}`,
          { method: "PATCH" }
        );

        if (response.ok) {
          await mutate(
            "https://cim.baliyoventures.com/api/mdmu/mero-desh-merai-utpadan/"
          );
          setSelectedApplication(null);
        }
      } catch (error) {
        console.error("Failed to update status", error);
      } finally {
        setStatusUpdateLoading(false);
      }
    },
    [selectedApplication]
  );

  const handlePrintFile = useCallback((fileUrl: string) => {
    window.open(fileUrl, "_blank");
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("Raw applications data:", applications);
    console.log("Applications type:", typeof applications);
    console.log("Is Array:", Array.isArray(applications));

    if (Array.isArray(applications)) {
      console.log("Applications length:", applications.length);
      if (applications.length > 0) {
        console.log("First application:", applications[0]);
      }
    }
  }, [applications]);

  // Render when no applications found
  const renderPage = () => {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            MDMU Applications
          </h1>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Input
              placeholder="Search by Company Name"
              value={filters.company}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, company: e.target.value }))
              }
            />
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value={ALL_OPTION}>All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value={ALL_OPTION}>All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* No Applications Message */}
          <div className="text-center text-gray-500 space-y-4 mt-10">
            {/* Check if filters are applied */}
            {Object.values(filters).some((f) => f !== "") ? (
              <>
                <p className="text-lg">
                  No applications match your current filters.
                </p>
                <p>
                  Try clearing some filters or adjusting your search criteria.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg">No applications found.</p>
                <p>There are currently no applications in the system.</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );

  // Render error state
  if (error)
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        Failed to load applications: {error.message}
      </div>
    );

  // If no applications after filtering, show page with no data message
  if (filteredApplications.length === 0) {
    return renderPage();
  }

  // Render table with applications
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          MDMU Applications
        </h1>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Input
            placeholder="Search by Company Name"
            value={filters.company}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, company: e.target.value }))
            }
          />
          <Select
            value={filters.category}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value={ALL_OPTION}>All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value={ALL_OPTION}>All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.name_of_company}</TableCell>
                <TableCell>
                  {app.nature_of_industry_sub_category_detail.category.name}
                </TableCell>
                <TableCell>{app.contact_email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      STATUS_COLORS[app.status as keyof typeof STATUS_COLORS] ||
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {app.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {app.status === "Approved" && app.file_url && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handlePrintFile(
                            `https://cim.baliyoventures.com${app.file_url}`
                          )
                        }
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setSelectedApplication(app)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Status Update Dialog */}
      <Dialog
        open={!!selectedApplication}
        onOpenChange={() => setSelectedApplication(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status for {selectedApplication?.name_of_company}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              disabled={statusUpdateLoading}
              variant="outline"
              className="w-full"
              onClick={() => handleStatusUpdate("Approved")}
            >
              {statusUpdateLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Approve"
              )}
            </Button>
            <Button
              disabled={statusUpdateLoading}
              variant="destructive"
              className="w-full"
              onClick={() => handleStatusUpdate("Rejected")}
            >
              {statusUpdateLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Reject"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
