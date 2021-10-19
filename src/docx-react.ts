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

export interface AttributeCollection {
    [name: string]: string | boolean | Record<string, unknown>;
}

namespace DocxReact {

    export function createElement(tagName: string, attributes: AttributeCollection | null, ...children: any[]): Paragraph {
        switch (tagName) {
            case 'p':
                return new Paragraph(attributes?.children as string ?? '');
            default: throw new TypeError('Error')
        }
    }

}
