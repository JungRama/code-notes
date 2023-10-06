import { type Workspace } from '@prisma/client';
import { create } from 'zustand';

interface StoreWorkspaces {
  defaultWorkspace: null | Workspace;
  setDefaultWorkspace: (workspaces: Workspace | null) => void;
}

const useStoreWorkspaces = create<StoreWorkspaces>((set) => ({
  defaultWorkspace: null,
  setDefaultWorkspace: (defaultWorkspace) => set(() => ({ defaultWorkspace })),
}));

export default useStoreWorkspaces;
