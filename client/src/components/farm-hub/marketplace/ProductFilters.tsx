import React from "react";
import { ProductFilters } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
}

const ProductFiltersComponent: React.FC<ProductFiltersProps> = ({ filters, onFilterChange }) => {
  const form = useForm<ProductFilters>({
    defaultValues: filters
  });

  const onSubmit = (data: ProductFilters) => {
    onFilterChange(data);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-slate-800 text-lg mb-4">Filter Products</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <FormLabel className="block text-sm font-medium text-slate-700 mb-1">Categories</FormLabel>
            <div className="space-y-2">
              {["Vegetables", "Fruits", "Grains", "Cash Crops"].map((category) => (
                <div key={category} className="flex items-center">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value === category}
                            onCheckedChange={() => {
                              form.setValue("category", category);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-slate-600 cursor-pointer">
                          {category}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <FormLabel className="block text-sm font-medium text-slate-700 mb-1">Price Range</FormLabel>
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="minPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Min"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span className="text-slate-500">to</span>
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Max"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-slate-700 mb-1">Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All Locations">All Locations</SelectItem>
                      <SelectItem value="Within 10 km">Within 10 km</SelectItem>
                      <SelectItem value="Within 25 km">Within 25 km</SelectItem>
                      <SelectItem value="Within 50 km">Within 50 km</SelectItem>
                      <SelectItem value="Within 100 km">Within 100 km</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div>
            <Button type="submit" className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Apply Filters
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductFiltersComponent;
