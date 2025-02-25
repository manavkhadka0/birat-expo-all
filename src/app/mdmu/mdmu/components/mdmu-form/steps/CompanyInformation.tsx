"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROVINCE_CHOICES } from "../constants";
import type { UseFormReturn } from "react-hook-form";
import type { MDMUFormData } from "../types";

interface CompanyInformationProps {
  form: UseFormReturn<MDMUFormData>;
}

export function CompanyInformation({ form }: CompanyInformationProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name_of_company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter company name"
                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-600" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address_province"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Province</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-colors">
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PROVINCE_CHOICES.map((province) => (
                  <SelectItem
                    key={province.value}
                    value={province.value}
                    className="cursor-pointer bg-white hover:bg-blue-50 focus:bg-blue-50"
                  >
                    {province.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red-600" />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="address_district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter district"
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_municipality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Municipality</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter municipality"
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="address_ward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ward No.</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter ward number"
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address_street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter street address"
                  className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
