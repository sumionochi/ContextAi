import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import db from '@/lib/supabase/db'
import { redirect } from 'next/navigation'
import DashboardSetup from '@/components/DashboardSetup'
import { userSubscriptionStatus } from '@/lib/supabase/queries'

type Props = {}

const WorkspacePage = async(props: Props) => {
  const supabase = createServerComponentClient({cookies});
  const {data: { user }} = await supabase.auth.getUser();

  if (!user) return;

  const ws = await db.query.workspaces.findFirst({
    where: (ws, { eq }) => eq(ws.workspaceOwner, user.id),
  });

  const {data:subscription, error:subscriptionError} = await userSubscriptionStatus(user.id);

  if(subscriptionError) return;

  if (!ws)
    return (
      <div className="h-screen w-screen p-4 flex justify-center items-center">
        <DashboardSetup user={user} subscription={null}/>
      </div>
    );

  redirect(`/workspace/${ws.id}`);
}

export default WorkspacePage