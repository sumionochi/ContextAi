import React from 'react';
import CustomDialogTrigger from '@/components/CustomDialogTrigger';
import SettingsForm from '@/components/SettingForm';

interface SettingsProps {
  children: React.ReactNode;
}

const Settings: React.FC<SettingsProps> = ({ children }) => {
  return (
    <CustomDialogTrigger
      header="Settings"
      content={<SettingsForm />}
    >
      {children}
    </CustomDialogTrigger>
  );
};

export default Settings;