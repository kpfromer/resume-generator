/// <reference path="./jsx/element-types.d.ts" />
/// <reference path="./jsx/intrinsic-elements.d.ts" />

import docx from 'docx';
import lodash from 'lodash';

const { ExternalHyperlink, Paragraph, TextRun } = docx;

type AttributeValue = any;

export interface Children {
  children?: AttributeValue;
}

export interface CustomElementHandler {
  (attributes: Attributes & Children, contents: string[]): string;
}

export interface Attributes {
  [key: string]: AttributeValue;
}

const flattenAndDefragmentChildren = (children) =>
  // flatten
  lodash
    .flattenDeep<any>(children)
    // defragment
    .reduce(
      (items, child) =>
        child.type === 'fragment' ? [...items, ...child.children] : [...items, child],
      [],
    );

export function Fragment({ children }) {
  return { type: 'fragment', children };
}

export function createElement(
  name: string | CustomElementHandler,
  attributes: (Attributes & Children) | undefined = {},
  ...contents: any[]
): any {
  const children = flattenAndDefragmentChildren((attributes && attributes.children) || contents);

  if (typeof name === 'string') {
    // console.log('--------------');
    // console.log({ name, attributes, contents });
    // console.log('--------------');

    switch (name) {
      case 'section':
        console.log((attributes && attributes.children) || contents);
        console.log('-----');
        console.log(children);
        return {
          children,
          properties: attributes,
        };
      case 'p':
        return new Paragraph({
          ...attributes,
          // TODO: extract this out
          // Ensure free text is converted to textrun
          children: children.map((child) => {
            if (typeof child === 'string') {
              return new TextRun(child);
            } else {
              return child;
            }
          }),
        });
      case 'external-link':
        return new ExternalHyperlink({
          link: attributes.link,
          children,
        });
      case 'text':
        return new TextRun({
          ...attributes,
          children,
        });
      default:
        throw new TypeError('Error');
    }
  } else {
    // console.log('----- START CUSTOM -----');
    // console.log(name(children ? { children, ...attributes } : attributes, contents));
    // console.log('----- END CUSTOM -----');
    return name(children ? { children, ...attributes } : attributes, contents);
  }
}
