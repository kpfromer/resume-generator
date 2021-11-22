/// <reference path="./jsx/element-types.d.ts" />
/// <reference path="./jsx/intrinsic-elements.d.ts" />

import {
  AlignmentType,
  Document,
  HeadingLevel,
  IRunOptions,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';

type AttributeValue = number | string | Date | boolean | string[];

export interface Children {
  children?: AttributeValue;
}

export interface CustomElementHandler {
  (attributes: Attributes & Children, contents: string[]): string;
}

export interface Attributes {
  [key: string]: AttributeValue;
}

export function createElement(
  name: string | CustomElementHandler,
  attributes: (Attributes & Children) | undefined = {},
  ...contents: any[]
): Paragraph {
  const children = (attributes && attributes.children) || contents;

  if (typeof name === 'string') {
    console.log('--------------');
    console.log({ name, attributes, contents });
    console.log('--------------');
    switch (name) {
      case 'p':
        return new Paragraph((attributes?.children as string) ?? '');
      case 'span':
        return new Paragraph('');
      default:
        throw new TypeError('Error');
    }
  } else {
    console.log('----- START CUSTOM -----');
    console.log(name(children ? { children, ...attributes } : attributes, contents));
    console.log('----- END CUSTOM -----');
    return new Paragraph('');
  }
}
