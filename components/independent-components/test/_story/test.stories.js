import test from '../test.hbs';

    import storybookCodePanel from 'storybook-code-panel';

    export default {
      title: 'Components|Independent/Test',
      parameters: {
        storybookCodePanel: storybookCodePanel.createParams(require.context('!!raw-loader!../', false, /^((?!stories).)*$/))
      }
    };

    export const withOptions = () => test();
