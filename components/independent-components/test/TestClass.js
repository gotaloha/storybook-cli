import ComponentBase from 'common/javascripts/utilities/ComponentBase';

    // Class is in a separate file so that if we want to override in another theme
    // we can import the base class without initializing it

    export default class test extends ComponentBase {

      constructor() {
        super('test');
      }

      onInitElement($test) {
        // Prevent event handler for attaching more than once
        $test
          .off('click', this.onClick)
          .on('click', this.onClick);
      }
    }
