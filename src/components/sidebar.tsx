import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  userSubscriptionStatus
} from '@/lib/supabase/queries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { twMerge } from 'tailwind-merge';
import { redirect } from 'next/navigation';
import WorkspaceDropdown from './WorkspaceDropdown';
import PlanUsage from './PlanUsage';
import NativeNavigation from './NativeNavigation';
import TempDropdown from './TempDropdown';
import UserCard from './Usercard';

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;

}

const Sidebar: React.FC<SidebarProps> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data: subscriptionData, error: subscriptionError } = await userSubscriptionStatus(user.id);
  const { data: workspaceFolders, error: foldersError } = await getFolders(
    params.workspaceId
  );
  if (subscriptionError || !workspaceFolders) redirect('/workspace');  
  
  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <div className={twMerge('hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between', className )}>
      <div>
      <WorkspaceDropdown
          privateWorkspaces={privateWorkspaces}
          collaboratingWorkspaces={collaboratingWorkspaces}
          sharedWorkspaces={sharedWorkspaces}
          defaultValue={[
            ...privateWorkspaces,
            ...collaboratingWorkspaces,
            ...sharedWorkspaces,
          ].find((workspace) => workspace.id === params.workspaceId)}
        />
        <PlanUsage
          foldersLength={workspaceFolders.length}
          subscription={subscriptionData}
        />
         {/* <NativeNavigation myWorkspaceId={params.workspaceId} /> */}
         <ScrollArea className="overflow-scroll relative h-[450px]">
          <div className="pointer-events-none w-full absolute bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-40" />
          <TempDropdown
            workspaceFolders={workspaceFolders || []}
            workspaceId={params.workspaceId}
          />
        </ScrollArea>
      </div>
      {/* <UserCard subscription={subscriptionData} /> */}
    </div>
  );
};

export default Sidebar;