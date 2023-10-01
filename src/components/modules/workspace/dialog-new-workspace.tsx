import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import { Button } from '~/components/ui/button';

import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

interface propsInterface {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

/**
 * Renders a new workspace dialog component.
 *
 * @param {propsInterface} props - The props for the component.
 * @return {JSX.Element} The rendered dialog component.
 */
export default function DialogNewWorkspace(props: propsInterface) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace and start manage your notes
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workspace name</Label>
              <Input
                id="name"
                type="text"
                placeholder="example. Frontend React Journal"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => props.onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
