import React from 'react';
import CustomDialogTrigger from '@/components/CustomDialogTrigger';
import BannerUploadForm from '@/components/BannerUpload';
import {
  appFoldersType,
  appWorkspacesType,
} from '@/lib/Providers/state-provider';
import { File, Folder, workspace } from '@/lib/supabase/supabase.types';

interface BannerUploadProps {
  children: React.ReactNode;
  className?: string;
  dirType: 'workspace' | 'file' | 'folder';
  id: string;
  details: appWorkspacesType | appFoldersType | File | workspace | Folder;
}

const BannerUpload: React.FC<BannerUploadProps> = ({
  details,
  id,
  dirType,
  children,
  className,
}) => {
  return (
    <CustomDialogTrigger
      header="Upload Banner"
      content={
        <BannerUploadForm
          details={details}
          dirType={dirType}
          id={id}
        />
      }
      className={className}
    >
      {children}
    </CustomDialogTrigger>
  );
};

export default BannerUpload;