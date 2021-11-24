import * as docxReact from './docx-react';

import { DocxMarkdownRenderer } from './markdown';
import docx from 'docx';
import { promises as fs } from 'fs';
import path from 'path';
import { yamlToResume } from './yaml';

const { Document, HeadingLevel, Packer, TabStopType, convertInchesToTwip } = docx;

function getMonthFromInt(value: number): string {
  switch (value) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sept';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
    default:
      return 'N/A';
  }
}

const DateText = ({ startDate, endDate, isCurrent }) => {
  const startDateText = getMonthFromInt(startDate.month) + '. ' + startDate.year;
  const endDateText = isCurrent ? 'Present' : `${getMonthFromInt(endDate.month)}. ${endDate.year}`;

  const text = `${startDateText} - ${endDateText}`;

  return <text>{text}</text>;
};

const removeHttps = (url: string) => url.replace('http://', '').replace('https://', '');

const insertIntoArray = (arr, value) => {
  return arr.reduce((result, element, index, array) => {
    result.push(element);

    if (index < array.length - 1) {
      result.push(value);
    }

    return result;
  }, []);
};

const margins = {
  top: 0.01,
  bottom: 0.01,
  left: 0.25,
  right: 0.25,
};

const Resume = (resume) => (
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

    <DocxMarkdownRenderer markdown={resume.basics.summary} />

    <p heading={HeadingLevel.HEADING_1} thematicBreak spacing={{ before: 100 }}>
      Experience
    </p>
    {resume.work.map((position, index) => (
      <>
        <p
          tabStops={[{ type: TabStopType.RIGHT, position: convertInchesToTwip(8 - margins.right) }]}
          spacing={{
            before: convertInchesToTwip(0.05),
            after: convertInchesToTwip(0.05),
          }}
        >
          <text bold size={2 * 13}>
            {position.name}
          </text>
          <text> | </text>
          <text italics>{position.position}</text>
          <text> | </text>
          <DateText
            startDate={position.startDate}
            endDate={position.endDate}
            isCurrent={!position.endDate}
          />
        </p>
        <DocxMarkdownRenderer markdown={position.summary} />
      </>
    ))}
    <p heading={HeadingLevel.HEADING_1} thematicBreak spacing={{ after: 150 }}>
      Education
    </p>
    {resume.education.map((school) => (
      <>
        <p
          tabStops={[{ type: TabStopType.RIGHT, position: convertInchesToTwip(8 - margins.right) }]}
          spacing={{ before: convertInchesToTwip(0.05), after: convertInchesToTwip(0.05) }}
        >
          <text bold size={2 * 13}>
            {school.institution}
          </text>
          <text> | </text>
          <DateText
            startDate={school.startDate}
            endDate={school.endDate}
            isCurrent={!school.endDate}
          />
        </p>
        <p>
          <text italics>{school.studyType}</text>
        </p>
      </>
    ))}
  </section>
);

const createResume = (component, config) => {
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

const getConfig = async () => {
  const file = await fs.readFile(path.join(process.cwd(), './resume-data.yaml'));
  const yamlData = file.toString();
  const resumeData = yamlToResume(yamlData);
  return resumeData;
};

(async function () {
  const config = await getConfig();
  // console.dir(toDocx(config.work![1].summary!), null);
  const resumeDocx = createResume(Resume, config);

  const buffer = await Packer.toBuffer(resumeDocx);
  await fs.writeFile('test.docx', buffer);
})();
