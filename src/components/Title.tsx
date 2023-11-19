import React from 'react';
import { Button } from './ui/button';

interface Props {
  title: string;
  subheading?: string;
  pill: string;
}

const TitleSection: React.FC<Props> = ({
  title,
  subheading,
  pill,
}) => {
  return (
    <React.Fragment>
      <section className=" flex flex-col gap-4 justify-center items-start md:items-center">
        <article className='rounded-full pb-0 text-sm text-white outline outline-2 outline-white/30'>
          <div className="rounded-full px-3 py-1 bg-slate-900">{pill}</div>
        </article>

        {subheading ? (
          <React.Fragment>
            <h2 className="text-left text-white mt-3 text-3xl sm:text-5xl sm:max-w-5xl md:text-center font-semibold ">
              {title}
            </h2>
            <p className="text-white text-lg mt-3 sm:max-w-4xl md:text-center">
              {subheading}
            </p>
          </React.Fragment>
        ) : (
          <h1 className="text-left leading-8 text-white text-4xl sm:text-6xl sm:max-w-5xl md:text-center font-semibold ">
            All-In-One Collaboration and Productivity Platform
          </h1>
        )}
      </section>
    </React.Fragment>
  );
};

export default TitleSection;