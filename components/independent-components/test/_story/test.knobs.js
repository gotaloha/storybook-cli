import { object } from '@storybook/addon-knobs';
import { getGroupId } from 'common/html/placeholder/helpers/placeholder-utils';
import data from './test.data';

export default (placeholderArray) => {
  const groupId = getGroupId(placeholderArray);

  // Knob fields show up in the order that the functions are called
  // This is why the simple ones are defined up here instead of inline
  // const showImage = boolean('Show Image', data.showImage, groupId);

  const test = object('Test', data.test, groupId);

  return {
    test: test
  };
};
