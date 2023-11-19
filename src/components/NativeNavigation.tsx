import Link from 'next/link';
import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import Settings from '@/components/Settings';
import Trash from '@/components/Trash';
import { Home, Settings2, Trash2 } from 'lucide-react';

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
  getSelectedElement?: (selection: string) => void;
}
const NativeNavigation: FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge('my-2', className)}>
      <ul className="flex flex-col">
        <li>
          <Link
            className=" group/native flex text-Neutrals-7 transition-all hover:dark:text-white cursor-pointer py-1 gap-2"
            href={`/workspace/${myWorkspaceId}`}
          >
            <Home />
            <span>My Workspace</span>
          </Link>
        </li>
        <Settings>
          <li className="group/native flex text-Neutrals-7 transition-all hover:dark:text-white cursor-pointer py-1 gap-2">
            <Settings2 />
            <span>Settings</span>
          </li>
        </Settings>
        <Trash>
          <li className="group/native flex text-Neutrals-7 transition-all hover:dark:text-white cursor-pointer py-1 gap-2">
            <Trash2 />
            <span>Trash</span>
          </li>
        </Trash>
      </ul>
    </nav>
  );
};

export default NativeNavigation;