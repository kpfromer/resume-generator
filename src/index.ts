import { Document, Packer } from 'docx';
import { achievements, education, experiences, resume, skills } from './resume.js';

import { DocumentCreator } from './document-creator.js';
import { promises as fs } from 'fs';
import path from 'path';
import { toDocx } from './markdown/index.js';
import { yamlToResume } from './yaml.js';

async function test() {
  const doc = new Document({
    sections: [
      {
        children: toDocx(
          `
- Worked on integrating **Google** Cloud AI's Platform Optimizer Product with JupyterLab.
- Enabled users to easily tune their machine learning model hyperparameters within the JupyterLab environment.
- Worked with user experience designers, product managers, and backend engineers to deliver the first full feature user interface for the Vizier Optimizer service.
`.trim(),
        ),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile('test.docx', buffer);
}

// async function test2() {
//   const doc = new Document({
//     sections: [
//       {
//         children: [DocxReact.createElement('p', { children: 'testing' })],
//       },
//     ],
//   });

//   const buffer = await Packer.toBuffer(doc);
//   await fs.writeFile('test.docx', buffer);
// }

const exportDocument = async () => {
  const file = await fs.readFile(path.join(process.cwd(), './resume-data.yaml'));
  const yamlData = file.toString();
  const resumeData = yamlToResume(yamlData);

  const documentCreator = new DocumentCreator();
  const doc = documentCreator.create(resumeData, [experiences, education, skills, achievements]);

  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile('resume.docx', buffer);

  await test();
  // await test2();
};

exportDocument();
