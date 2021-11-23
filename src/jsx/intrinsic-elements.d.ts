type Pargraph = import('docx').Pargraph;

declare namespace JSX {
  type Element = Paragraph[];
  interface IntrinsicElements {
    section: DocxSectionTag;
    p: DocxPargraphTag;
    text: DocxTextTag;
    'external-link': DocxExternalLinkTag;
  }
}
