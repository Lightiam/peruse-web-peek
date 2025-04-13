
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface DeveloperSignupFormProps {
  form: UseFormReturn<any>;
}

const DeveloperSignupForm: React.FC<DeveloperSignupFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills (comma separated)</FormLabel>
            <FormControl>
              <Input placeholder="React, TypeScript, Node.js" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell clients about your experience and expertise..."
                className="min-h-[100px]"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="hourlyRate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly Rate ($)</FormLabel>
            <FormControl>
              <Input type="number" min="0" placeholder="0" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="availableForChat"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>Available for Chat</FormLabel>
              <div className="text-sm text-muted-foreground">
                Allow potential clients to chat with you directly
              </div>
            </div>
            <FormControl>
              <input 
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                className="accent-blue-600 h-4 w-4"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DeveloperSignupForm;
