'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Subscription } from '@/lib/supabase/supabase.types';
import { folders } from '@/lib/supabase/schema';
import { useAppState } from '@/lib/Providers/state-provider';
import { Diamond } from 'lucide-react';

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}

const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  const maxFreePlan = 3;
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState(
    (foldersLength / maxFreePlan) * 100
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    )?.folders.length;
    if (stateFoldersLength === undefined) return;

    setUsagePercentage((stateFoldersLength / maxFreePlan) * 100);
  }, [state, workspaceId]);

  return (
    <article className="mb-4 cursor-pointer">
      {subscription?.status !== 'active' && (
        <div className="flex gap-2 text-muted-foreground mb-2  items-center">
          <div className="h-4 w-4">
            <Diamond/>
          </div>
          <div className="flex justify-between w-full items-center">
            <div>Free Plan</div>
            <small>{usagePercentage.toFixed(0)}% / 100%</small>
          </div>
        </div>
      )}

      {subscription?.status !== 'active' && (
        <Progress
          value={usagePercentage}
          className=" h-1"
        />
      )}
    </article>
  );
};

export default PlanUsage;