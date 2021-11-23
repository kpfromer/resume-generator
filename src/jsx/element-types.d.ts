type IParagraphPropertiesOptions = import('docx').IParagraphPropertiesOptions;
type IRunPropertiesOptions = import('docx').IRunPropertiesOptions;
type ISectionPropertiesOptions = import('docx').ISectionPropertiesOptions;

declare namespace JSX {
  interface DocxTag {}
  interface DocxSectionTag extends DocxTag, ISectionPropertiesOptions {}
  interface DocxPargraphTag extends DocxTag, IParagraphPropertiesOptions {}
  interface DocxTextTag extends DocxTag, IRunPropertiesOptions {}
  interface DocxExternalLinkTag extends DocxTag {
    link: string;
  }
}
