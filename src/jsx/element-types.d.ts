declare namespace JSX {
  interface DocxTag {}
  interface DocxPargraphTag extends DocxTag {
    bold?: boolean;
  }
  interface DocxSpanTag extends DocxTag {
    bold?: boolean;
  }
}
