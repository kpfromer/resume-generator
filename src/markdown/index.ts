import { AlignmentType, IRunOptions, Paragraph, ParagraphChild, TextRun } from 'docx';
import remarkParse from 'remark-parse';
import { assertText, isList, isListItem, isParagraph, isRoot, isStrong, isText } from 'ts-mdast';
import { unified } from 'unified';
import { Node } from 'unist';

export interface Options {
  textOptions?: IRunOptions;
}

type RequiredOptions = Required<Options>;

// TODO: better than item[] (stack implementation)

function transformerParagraph(node: Node, options: RequiredOptions): ParagraphChild[] {
  const { textOptions } = options;

  if (isText(node)) {
    return [new TextRun({ ...textOptions, text: node.value })];
  } else if (isParagraph(node)) {
    return node.children.flatMap((node) => transformerParagraph(node, options));
  } else if (isStrong(node)) {
    return node.children.map((subNode) => {
      assertText(subNode);
      const { value } = subNode;

      return new TextRun({ ...textOptions, text: value, bold: true });
    });
  } else {
    throw new Error(`Invalid Paragraph Type "${node.type}"`);
  }
}

function transformer(node: Node, options: RequiredOptions): Paragraph[] {
  if (isParagraph(node)) {
    return [
      new Paragraph({
        children: node.children.flatMap((node) => transformerParagraph(node, options)),
      }),
    ];
  } else if (isList(node)) {
    return node.children.flatMap((node) => transformer(node, options));
  } else if (isListItem(node)) {
    return [
      new Paragraph({
        bullet: { level: 0 },
        children: node.children.flatMap((node) => transformerParagraph(node, options)),
      }),
    ];
  } else if (isRoot(node)) {
    console.log(JSON.stringify(node, null, 2));
    return node.children.flatMap((node) => transformer(node, options));
  } else {
    // TODO: better error message
    throw new Error(`Invalid type "${node.type}"`);
  }
}

const parser = unified().use(remarkParse);

export function toDocx(markdown: string, options: Options = {}): Paragraph[] {
  const requiredOptions = {
    textOptions: {},
    ...options,
  };

  const data = parser.parse(markdown);
  const docxNodes = transformer(data, requiredOptions);
  return docxNodes;
}
