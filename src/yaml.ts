import { Resume } from './types.js';
import YAML from 'yaml';

export function yamlToResume(yamlString: string): Resume {
  const data = YAML.parse(yamlString);
  // TODO: valid js object
  return data;
}
