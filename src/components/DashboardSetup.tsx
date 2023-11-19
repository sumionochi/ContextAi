"use client"
import { AuthUser } from '@supabase/supabase-js'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import EmojiPicker from './global/emoji-picker'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Subscription, workspace } from '@/lib/supabase/supabase.types'
import {CreateWorkspaceFormSchema} from '@/lib/types'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAppState } from '@/lib/Providers/state-provider'
import { v4 as uuidv4 } from 'uuid';
import {createWorkspace} from '@/lib/supabase/queries'
import { Button } from './ui/button'
import Loader from './Loader'


type Props = {
    user: AuthUser,
    subscription: Subscription | null,
}

const DashboardSetup = ({user,subscription}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedEmoji, setSelectedEmoji] = React.useState('💼');

  const supabase = createClientComponentClient();
  const { dispatch } = useAppState();

  const {register, handleSubmit, reset, formState:{isSubmitting:isLoading, errors}} = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  })

  const onSubmit: SubmitHandler<z.infer<typeof CreateWorkspaceFormSchema>> = async (value) => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = uuidv4();

    if (file) {
      try {
        const fileUUID = uuidv4();
        const { data, error } = await supabase.storage
          .from('workspace-logos')
          .upload(`workspaceLogo.${workspaceUUID}.${fileUUID}`, file, {
            cacheControl: '3600',
            upsert: false,
          });
        if (error) throw new Error('');
        filePath = data.path;
      } catch (storageError) {
        console.log(storageError);
        toast({
          variant: 'destructive',
          title: 'Error! Could not upload your workspace picture',
        });
      }
    }
    try {
      const newWorkspace: workspace = {
        data: null,
        createdAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: '',
        title: value.workspaceName,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: null
      };
      await createWorkspace(newWorkspace);
      dispatch({
        type: 'ADD_WORKSPACE',
        payload: { ...newWorkspace, folders: [] },
      });
      toast({
        title: 'Workspace Created',
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/workspace/${newWorkspace.id}`);
    } 
    catch (error) {
      toast({
        variant: 'destructive',
        title: 'Could not create your workspace',
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } 
    finally {
      reset();
    }
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Build A Workspace</CardTitle>
            <CardDescription>Build a private workspace to get started. Collaborators can be added later from the workspace settings tab.</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center  gap-4">
              <div className="text-5xl">
                <EmojiPicker
                  getValue={(emoji) => {
                    setSelectedEmoji(emoji);
                  }}
                >
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className="w-full">
                <Label
                  htmlFor="workspaceName"
                  className="text-sm text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="workspaceName"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isLoading}
                  {...register('workspaceName', {
                    required: 'Workspace name is required',
                  })}
                />
                <small className="text-red-600">
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <label htmlFor="workspaceLogo" className="text-sm text-muted-foreground ">
                Workspace Logo
              </label>   
              <Input
                disabled={isLoading || subscription?.status !== 'active'}
                id="logo"
                type="file"
                accept="image/*"
                placeholder="Workspace Logo"
                {...register('logo', { required: false })}
              />
              <small className="text-red-600">
                {errors?.logo?.message?.toString()}
              </small>
              {subscription?.status !== 'active' && (
                <small className="text-muted-foreground">
                  To customize your workspace, you need to be on a Pro Plan
                </small>
              )}
            </div>
            <div className="self-end">
              <Button
                disabled={isLoading}
                type="submit"
              >
                {!isLoading ? 'Create Workspace' : <Loader />}
              </Button>
            </div>
          </div>
        </form>
        </CardContent>
    </Card>
  )
}



export default DashboardSetup