import * as docxReact from './docx-react';

import { Document, HeadingLevel, Packer } from 'docx';

import { promises as fs } from 'fs';
import path from 'path';

const CustomComponent = ({ value }) => {
  return <text bold={value === 'true'}>custom data</text>;
};

const test = () => (
  <section>
    <p
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
    </p>

    <p heading={HeadingLevel.HEADING_2}>
      <text strike>Experience</text>
    </p>

    <p>
      base text
      <text>span text</text>
      <CustomComponent value="true" />
    </p>

    <p>
      base text
      <text>span text</text>
      <CustomComponent value="true" />
    </p>
  </section>
);

(async function () {
  const out = test();
  console.log(out);

  const doc = new Document({
    sections: [
      {
        children: out,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile('test.docx', buffer);
})();
