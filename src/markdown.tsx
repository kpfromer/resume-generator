import * as docxReact from './docx-react';

import { AlignmentType, IRunOptions, Paragraph, ParagraphChild, TextRun } from 'docx';
import { assertText, isList, isListItem, isParagraph, isRoot, isStrong, isText } from 'ts-mdast';

import { Node } from 'unist';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export interface Options {
  textOptions?: IRunOptions;
}

type RequiredOptions = Required<Options>;

function transformer(node: Node, options: RequiredOptions, ignoreParagraph = false): any {
  const { textOptions } = options;
  console.log(node);

  if (isParagraph(node) && !ignoreParagraph) {
    return <p>{node.children.map((node) => transformer(node, options))}</p>;
  } else if (isParagraph(node)) {
    return node.children.map((node) => transformer(node, options));
  } else if (isList(node)) {
    return node.children.map((node) => transformer(node, options));
  } else if (isListItem(node)) {
    return (
      <p bullet={{ level: 0 }}>{node.children.map((node) => transformer(node, options, true))}</p>
    );
  } else if (isRoot(node)) {
    return node.children.map((node) => transformer(node, options));
  }
  // text stuff
  else if (isText(node)) {
    return <text {...textOptions}>{node.value}</text>;
  } else if (isStrong(node)) {
    return <text {...textOptions} bold></text>;
  } else {
    throw new Error(`Invalid type "${node.type}"`);
  }
}

const parser = unified().use(remarkParse);

function toDocx(markdown: string, options: Options = {}): Paragraph[] {
  const requiredOptions = {
    textOptions: {},
    ...options,
  };

  const data = parser.parse(markdown);
  const docxNodes = transformer(data, requiredOptions);
  return docxNodes;
}

export const DocxMarkdownRenderer = ({
  markdown,
  options,
}: {
  markdown: string;
  options?: Options;
}) => toDocx(markdown, options);
