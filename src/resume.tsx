import * as docxReact from 'docx-react';

import { getMonthFromInt, insertIntoArray, removeHttps } from './helpers';

import { DocxMarkdownRenderer } from './markdown';
import { ResumeDate } from './types';
import _ from 'lodash';
import docx from 'docx';

const { Document, HeadingLevel, TabStopType, convertInchesToTwip } = docx;

const DateText = ({
  startDate,
  endDate,
}: {
  startDate: ResumeDate;
  endDate?: ResumeDate | undefined;
}) => {
  const length = 4;
  const omission = '.';
  const getTruncated = (string: string) => {
    if (string.length === length - omission.length) {
      return string;
    }
    return _.truncate(string, { length, omission });
  };
  const getDateText = (data: ResumeDate) =>
    `${getTruncated(getMonthFromInt(data.month))} ${data.year}`;

  const isCurrent = endDate !== undefined;
  let text: string;
  const startDateText = getDateText(startDate);

  if (isCurrent) {
    // Is the same start and end months/years
    if (isCurrent && startDate.month === endDate.month && startDate.year === endDate.year) {
      text = startDateText;
    } else {
      const endDateText = getDateText(endDate);
      text = `${startDateText} - ${endDateText}`;
    }
  } else {
    text = `${startDateText} - Present`;
  }

  return <text>{text}</text>;
};

const margins = {
  top: 0.5,
  bottom: 0.5,
  left: 0.5,
  right: 0.5,
};

const AboutMe = ({ resume }) => (
  <>
    <p heading={HeadingLevel.TITLE}>{resume.basics.name}</p>
    <p spacing={{ before: convertInchesToTwip(0.05), after: convertInchesToTwip(0.05) }}>
      {resume.basics.tagLine}
    </p>
    <p spacing={{ after: 150 }}>
      {insertIntoArray(
        resume.basics.profiles.map((profile) => (
          <external-link link={profile.url}>
            <text bold color="#3b82f6">
              {removeHttps(profile.url)}
            </text>
          </external-link>
        )),
        <text>{' | '}</text>,
      )}
    </p>
  </>
);

const Experience = ({ resume }) => (
  <>
    <p heading={HeadingLevel.HEADING_1} thematicBreak spacing={{ before: 150 }}>
      Experience
    </p>
    {resume.work.map((position, index) => (
      <>
        <p
          spacing={{
            before: convertInchesToTwip(0.1),
            after: convertInchesToTwip(0.1),
          }}
        >
          <text bold size={2 * 13}>
            {position.name}
          </text>
          <text> | </text>
          <text italics>{position.position}</text>
          <text> | </text>
          <DateText startDate={position.startDate} endDate={position.endDate} />
        </p>
        <DocxMarkdownRenderer markdown={position.summary} />
      </>
    ))}
  </>
);

const Education = ({ resume }) => (
  <>
    <p heading={HeadingLevel.HEADING_1} thematicBreak spacing={{ after: 150 }}>
      Education
    </p>
    {resume.education.map((school) => (
      <>
        <p spacing={{ before: convertInchesToTwip(0.1), after: convertInchesToTwip(0.1) }}>
          <text bold size={2 * 13}>
            {school.institution}
          </text>
          <text> | </text>
          <DateText startDate={school.startDate} endDate={school.endDate} />
        </p>
        <p>
          <text italics>{school.studyType}</text>
        </p>
      </>
    ))}
  </>
);

const Skills = ({ resume }) => {
  const sections = Object.entries(resume.skills);
  return (
    <>
      <p heading={HeadingLevel.HEADING_1} thematicBreak spacing={{ before: 150, after: 150 }}>
        Skills
      </p>

      {sections.map(([title, skills]) => (
        <p>
          <text bold>{title}</text>
          <text> {skills}</text>
        </p>
      ))}
    </>
  );
};

export const Resume = (resume) => (
  <section
    page={{
      margin: {
        top: convertInchesToTwip(margins.top),
        bottom: convertInchesToTwip(margins.bottom),
        left: convertInchesToTwip(margins.left),
        right: convertInchesToTwip(margins.right),
        header: 0,
        footer: 0,
      },
    }}
  >
    <AboutMe resume={resume} />

    <DocxMarkdownRenderer markdown={resume.basics.summary} />

    <Experience resume={resume} />

    <Education resume={resume} />

    <Skills resume={resume} />
  </section>
);

export const createResume = (component, config) => {
  const doc = new Document({
    styles: {
      default: {
        title: {
          run: {
            font: 'Inter',
            size: 30 * 2,
            color: '#E3872D',
            bold: true,
          },
        },
        heading1: {
          run: {
            font: 'Inter',
            size: 18 * 2,
            color: '#E3872D',
            bold: true,
          },
        },
        heading2: {
          run: {
            font: 'Inter',
            size: 14 * 2,
            color: '#E3872D',
            bold: true,
          },
        },
        strong: {
          run: {
            font: 'Inter',
          },
        },
        hyperlink: {
          run: {
            font: 'Inter',
            color: '#3b82f6',
          },
        },
        listParagraph: {
          run: {
            font: 'Inter',
          },
        },
      },
      paragraphStyles: [
        // @ts-ignore
        {
          name: 'Normal',
          run: {
            font: 'Inter',
          },
        },
      ],
    },
    sections: [component(config)],
  });

  return doc;
};
