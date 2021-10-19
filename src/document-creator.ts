import {
  AlignmentType,
  Document,
  HeadingLevel,
  IRunOptions,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';
import { toDocx } from './markdown/index.js';
import { Basics, Education, Profile, Resume, Work } from './types.js';
import { emptyArray, nonnull } from './helper.js';

const DEFAULT_FONT_OPTIONS: IRunOptions = {
  font: 'Inter',
};

export class DocumentCreator {
  create(resume: Resume, [experiences, educations, skills, achivements]) {
    const document = new Document({
      sections: [
        {
          children: [
            ...emptyArray(resume.basics, (arg) => this.createBasics(arg)),
            ...emptyArray(resume.work, (arg) => this.createWorkSection(arg)),
            ...emptyArray(resume.education, (arg) => this.createEducationSection(arg)),

            this.createHeading('Skills'),
            this.createSkillList(skills),
            this.createHeading('Achievements'),
            ...this.createAchivementsList(achivements),
          ],
        },
      ],
    });

    return document;
  }

  private createProfiles(profiles: Profile[]): TextRun | null {
    if (profiles.length === 0) {
      return null;
    }

    return this.createText(
      // TODO: profile hyperlink
      profiles.map((profile) => `${profile.network}: ${profile.url}`).join(' | '),
    );
  }

  private createBasics(basics: Basics): Paragraph[] {
    return [
      new Paragraph({
        children: [this.createText(basics.name ?? '')],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [this.createProfiles(basics.profiles ?? [])].filter(
          (value) => !!value,
        ) as TextRun[],
      }),
      // this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
    ];
  }

  private createWorkSection(work: Work[]): Paragraph[] {
    return [
      this.createHeading('Experience'),
      ...work.flatMap((position) => [
        this.createInstitutionHeader(
          position.name ?? '',
          this.createPositionDateText(
            position.startDate,
            position.endDate,
            // is current position
            !position.endDate,
          ),
        ),
        this.createRoleText(position.position ?? ''),

        ...toDocx(position.summary ?? '', { textOptions: DEFAULT_FONT_OPTIONS }),
        // ...this.splitParagraphIntoBullets(position.summary).map((bulletPoint) =>
        //   this.createBullet(bulletPoint),
        // ),
        // HACK
        new Paragraph({ text: '', spacing: { after: 100 } }),
      ]),
    ];
  }

  private createEducationSection(educations: Education[]): Paragraph[] {
    return [
      this.createHeading('Education'),
      ...educations.flatMap((education) =>
        [
          education.startDate && education.endDate
            ? this.createInstitutionHeader(
              education.institution ?? '',
              `${education.startDate.year} - ${education.endDate.year}`,
            )
            : null,
          this.createRoleText(`${education.studyType}`),
          ...(education.summary && education.summary.length > 0
            ? this.splitParagraphIntoBullets(education.summary ?? '').map((bulletPoint) =>
              this.createBullet(bulletPoint),
            )
            : []),
        ].filter(nonnull),
      ),
    ];
  }

  createContactInfo(phoneNumber: string, profileUrl, email) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        this.createText(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
        this.createText({
          text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
          break: 1,
        }),
      ],
    });
  }

  private createText(options: string | IRunOptions): TextRun {
    let textRunOptions: IRunOptions = DEFAULT_FONT_OPTIONS;
    if (typeof options === 'string') {
      textRunOptions = { ...textRunOptions, children: [options] };
    } else {
      textRunOptions = { ...textRunOptions, ...options };
    }

    return new TextRun(textRunOptions);
  }

  createHeading(text: string): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
      children: [this.createText(text)],
    });
  }

  createSubHeading(text: string): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [this.createText(text)],
    });
  }

  createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        this.createText({
          text: institutionName,
          bold: true,
        }),
        this.createText({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        this.createText({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }

  createBullet(text: string): Paragraph {
    return new Paragraph({
      bullet: {
        level: 0,
      },
      children: [this.createText(text)],
    });
  }

  createSkillList(skills) {
    return new Paragraph({
      children: [this.createText(skills.map((skill) => skill.name).join(', ') + '.')],
    });
  }

  createAchivementsList(achivements) {
    return achivements.map((achievement) => this.createBullet(achievement.name));
  }

  createInterests(interests) {
    return new Paragraph({
      children: [this.createText(interests)],
    });
  }

  splitParagraphIntoBullets(text) {
    return text.split('\n\n');
  }

  createPositionDateText(startDate, endDate, isCurrent) {
    const startDateText = this.getMonthFromInt(startDate.month) + '. ' + startDate.year;
    const endDateText = isCurrent
      ? 'Present'
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  getMonthFromInt(value: number): string {
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
}
