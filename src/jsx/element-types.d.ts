type IParagraphPropertiesOptions = import('docx').IParagraphPropertiesOptions;
type IRunPropertiesOptions = import('docx').IRunPropertiesOptions;

declare namespace JSX {
  interface DocxTag {}
  interface DocxSectionTag extends DocxTag {}
  interface DocxPargraphTag extends DocxTag, IParagraphPropertiesOptions {}
  interface DocxTextTag extends DocxTag, IRunPropertiesOptions {}
}
