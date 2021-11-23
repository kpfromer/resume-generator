import * as docxReact from './docx-react';

import { AlignmentType, Document, HeadingLevel, Packer, TabStopPosition, TabStopType } from 'docx';

import { promises as fs } from 'fs';
import path from 'path';
import { yamlToResume } from './yaml';

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

const Resume = (resume) => (
  <section>
    <p heading={HeadingLevel.TITLE}>{resume.basics.name}</p>

    <p>{resume.basics.tagLine}</p>

    <p>
      {insertIntoArray(
        resume.basics.profiles.map((profile) => (
          <external-link link={profile.url}>
            <text bold>{removeHttps(profile.url)}</text>
          </external-link>
        )),
        <text>{'     '}</text>,
      )}
    </p>

    <p heading={HeadingLevel.HEADING_1}>Experience</p>

    {resume.work.map((position) => (
      <p
        // tabStops={[{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]}
        spacing={{ after: 100 }}
      >
        <text bold>{position.name}</text>
        <DateText
          startDate={position.startDate}
          endDate={position.endDate}
          isCurrent={!position.endDate}
        />
        <text italics>{position.position}</text>
        <text>text about position</text>
      </p>
    ))}

    <p heading={HeadingLevel.HEADING_1}>Education</p>

    {resume.education.map((school) => (
      <p
        // tabStops={[{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]}
        spacing={{ after: 100 }}
      >
        <text bold>{school.institution}</text>
        <DateText
          startDate={school.startDate}
          endDate={school.endDate}
          isCurrent={!school.endDate}
        />
        <text italics>{school.studyType}</text>
      </p>
    ))}
    {/* <p
      heading={HeadingLevel.HEADING_1}
      border={{
        top: {
          color: 'auto',
          space: 1,
          value: 'single',
          size: 6,
        },
        bottom: {
          color: 'auto',
          space: 1,
          value: 'single',
          size: 6,
        },
      }}
    >
      Experience
    </p> */}
  </section>
);

const createResume = (component, config) => {
  const doc = new Document({
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
  const resumeDocx = createResume(Resume, config);

  const buffer = await Packer.toBuffer(resumeDocx);
  await fs.writeFile('test.docx', buffer);
})();
