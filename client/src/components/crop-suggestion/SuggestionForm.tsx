import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cropSuggestionFormSchema } from "@shared/schema";
import { CropSuggestionFormData, District, SoilType } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SuggestionFormProps {
  districts: District[];
  soilTypes: SoilType[];
  onSubmit: (data: CropSuggestionFormData) => void;
  isLoading: boolean;
}

const SuggestionForm: React.FC<SuggestionFormProps> = ({
  districts,
  soilTypes,
  onSubmit,
  isLoading
}) => {
  const form = useForm<CropSuggestionFormData>({
    resolver: zodResolver(cropSuggestionFormSchema),
    defaultValues: {
      district: "",
      soilType: "",
      phLevel: 7,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0
    }
  });

  const handleSubmit = (data: CropSuggestionFormData) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-heading font-semibold mb-4">Enter Your Farm Details</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">District</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.name}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soilType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Soil Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {soilTypes.map((soilType) => (
                        <SelectItem key={soilType.id} value={soilType.name}>
                          {soilType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">pH Level</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      max={14} 
                      step={0.1} 
                      placeholder="Enter pH level (0-14)" 
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <p className="mt-1 text-xs text-slate-500">pH level typically ranges from 0 to 14. Neutral is 7.</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nitrogen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Nitrogen Level (kg/ha)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      placeholder="Enter nitrogen level" 
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phosphorus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Phosphorus Level (kg/ha)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      placeholder="Enter phosphorus level" 
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="potassium"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700">Potassium Level (kg/ha)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={0} 
                      placeholder="Enter potassium level" 
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between md:col-span-2">
              <div className="flex items-center">
                <span className="text-sm text-slate-600">
                  <i className="ri-information-line mr-1 text-primary-500"></i>
                  Need help with soil testing? <a href="#" className="text-primary-600 hover:text-primary-700">Find local labs</a>
                </span>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 focus:outline-none"
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  className="ml-3 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Get Suggestions"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SuggestionForm;
