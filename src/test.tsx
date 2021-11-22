import * as docxReact from './docx-react';

const CustomComponent = ({ value }) => {
  return <span bold={value === 'true'}>custom data</span>;
};

const test = () => (
  <p bold>
    base text
    <span bold>span text</span>
    <CustomComponent value="true" />
  </p>
);

test();
