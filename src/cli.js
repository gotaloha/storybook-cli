import * as fs from 'fs'; // Access file system
import chalk from 'chalk'; // Pretty console colors

export function cli (args) {
  const operation = parseArguments(args);

  if (operation.type === 'component') {
    let location = operation.global ? 'global' : 'independent';
    let locationTitle = location.charAt(0).toUpperCase() + location.slice(1);
    let title = operation.name.charAt(0).toUpperCase() + operation.name.slice(1);

    // Construct Templates


    let template_data_json = `{
  "title": ""
}
`;

    let template_knobs = `import { object } from '@storybook/addon-knobs';
import { getGroupId } from 'common/html/placeholder/helpers/placeholder-utils';
import data from './${operation.name}.data';

export default (placeholderArray) => {
  const groupId = getGroupId(placeholderArray);

  // Knob fields show up in the order that the functions are called
  // This is why the simple ones are defined up here instead of inline
  // const showImage = boolean('Show Image', data.showImage, groupId);

  const ${operation.name} = object('${title}', data.${operation.name}, groupId);

  return {
    ${operation.name}: ${operation.name}
  };
};
`;

    let template_stories = `import ${operation.name} from '../${operation.name}.hbs';

    import storybookCodePanel from 'storybook-code-panel';

    export default {
      title: 'Components|${locationTitle}/${title}',
      parameters: {
        storybookCodePanel: storybookCodePanel.createParams(require.context('!!raw-loader!../', false, /^((?!stories).)*$/))
      }
    };

    export const withOptions = () => ${operation.name}();
`;

    let template_scss = `/********************************************************************************
 * SCSS for component: ${title}
 *********************************************************************************/
`;

    let template_hbs = `{{#default-data "./_story/${operation.name}.knobs.js" "${title}"}}

{{/default-data}}
`;

    let template_js = `import ${title} from './${title}Class';

    // Create component
    const ${operation.name} = new ${title} ();

    window.$(document).ready(function() {
      // *** Enter your javascript here ***
    });

    // and initialize it
    ${operation.name}.initialize();
`;

    let template_class = `import ComponentBase from 'common/javascripts/utilities/ComponentBase';

    // Class is in a separate file so that if we want to override in another theme
    // we can import the base class without initializing it

    export default class ${operation.name} extends ComponentBase {

      constructor() {
        super('${operation.name}');
      }

      onInitElement($${operation.name}) {
        // Prevent event handler for attaching more than once
        $${operation.name}
          .off('click', this.onClick)
          .on('click', this.onClick);
      }
    }
`;

    // General folder structure
    if (!fs.existsSync('components')) { fs.mkdirSync('components'); }
    if (!fs.existsSync('components/global-components')) { fs.mkdirSync('components/global-components'); }
    if (!fs.existsSync('components/independent-components')) { fs.mkdirSync('components/independent-components'); }


    if (!fs.existsSync(`components/${location}-components/${operation.name}`)) { fs.mkdirSync(`components/${location}-components/${operation.name}`); }
    if (!fs.existsSync(`components/${location}-components/${operation.name}/_story`)) { fs.mkdirSync(`components/${location}-components/${operation.name}/_story`); }

    // Create ***.data.json file
    fs.writeFile(`components/${location}-components/${operation.name}/_story/${operation.name}.data.json`, template_data_json, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.data.json`));
    });

    // Create ***.knobs.js file
    fs.writeFile(`components/${location}-components/${operation.name}/_story/${operation.name}.knobs.js`, template_knobs, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.knobs.js`));
    });

    // Create ***.stories.js
    fs.writeFile(`components/${location}-components/${operation.name}/_story/${operation.name}.stories.js`, template_stories, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.stories.js`));
    });

    // Create ***.scss
    fs.writeFile(`components/${location}-components/${operation.name}/${operation.name}.scss`, template_scss, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.scss`));
    });

    // Create ***.hbs
    fs.writeFile(`components/${location}-components/${operation.name}/${operation.name}.hbs`, template_hbs, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.hbs`));
    });

    // Create ***.js
    fs.writeFile(`components/${location}-components/${operation.name}/${operation.name}.js`, template_js, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${operation.name}.js`));
    });

    // Create ***Class.js
    fs.writeFile(`components/${location}-components/${operation.name}/${title}Class.js`, template_class, function(err) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(chalk.greenBright(`Successfully added file: `) + chalk.whiteBright(`${title}Class.js`));
    });
  }
}

function parseArguments(args) {
  args.splice(0, 2);

  const operation = {
    type: args[0]
  }

  args.forEach(arg => {
    if (arg.includes('--name')) {
      const name = args[args.indexOf(arg) + 1];

      if (!(name)) {
        throw new Error('A component name must be provided!');
      }
      operation.name = name;
    }

    if (arg.includes('--global')) {
      const global = args[args.indexOf(arg) + 1];

      operation.global = true;
    }
  });

  if (!(operation.hasOwnProperty('name'))) {
    throw new Error('Must specify a component name via --name `name`');
  }
  return operation;
}
