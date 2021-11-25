import { Resume, createResume } from './resume';

import docx from 'docx';
import { promises as fs } from 'fs';
import path from 'path';
import { yamlToResume } from './yaml';

const { Packer } = docx;

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
  await fs.writeFile('resume.docx', buffer);
})();
