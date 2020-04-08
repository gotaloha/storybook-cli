# Storybook CLI for creating Components

## Installation

1. Clone the repo: { NEED URL }

2. Navigate into the base directory and install via NPM: `npm install`

3. Create a symbolic link for ease of use: `npm link`

## Usage

To create a scaffolding for a new component in your Storybook project, simply enter the following command followed by the name of the component you wish to create. Lowercase, please.

By default, the component will be created in the "independent-components" directory. To create the new component in the "global-components" directory, simply add the `--global` flag to the command.

`create component --name %YOUR_COMPONENT_NAME%`

**Example:**

`create component --name foobar`

or

`create component --name foobar --global`

This will create the necessary files within the appropriate directory, each file customized using the name you specified for your component.


```
storybook
  components
    independent-components
      foobar
        _story
          foobar.data.json
          foobar.knobs.js
          foobar.stories.js
        foobar.hbs
        foobar.js
        foobar.scss
        FoobarClass.js
```
