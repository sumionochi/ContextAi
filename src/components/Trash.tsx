import React from 'react';
import CustomDialogTrigger from '@/components/CustomDialogTrigger';
import TrashRestore from '@/components/TrashRestore';

interface TrashProps {
  children: React.ReactNode;
}

const Trash: React.FC<TrashProps> = ({ children }) => {
  return (
    <CustomDialogTrigger
      header="Trash"
      content={<TrashRestore/>}
    >
      {children}
    </CustomDialogTrigger>
  );
};

export default Trash;