const isNotEmptyFor = name => {
    return value => {
      if (value === undefined || value === '') return name + ' is required';
      return true;
    }
}

module.exports = plop => {
    plop.setGenerator('component', {
        description: 'create a react component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
                validate: isNotEmptyFor('component name')
            },
            {
                type: 'list',
                name: 'category',
                message: 'Tell me about the component under which category?',
                default: 'none',
                choices: [
                    { name: 'Feature', value: 'features' },
                    { name: 'Shared', value: 'shared' }
                ]
            }
        ],
        actions: data => {
            let actions = [];
            if (data.category === 'features') {
                actions = [
                    {
                        type: 'add',
                        path: 'src/features/{{kebabCase name}}/index.tsx',
                        templateFile: 'plop-templates/component.hbs'
                    },
                    {
                        type: 'add',
                        path: '__tests__/{{pascalCase name}}.test.tsx',
                        templateFile: 'plop-templates/component.test.hbs'
                    },
                    {
                        type: 'add',
                        path: 'src/features/{{kebabCase name}}/styles.ts',
                        templateFile: 'plop-templates/component.styles.hbs'
                    }
                ];
            } else {
                actions = [
                    {
                        type: 'add',
                        path: 'src/shared/{{kebabCase name}}/index.tsx',
                        templateFile: 'plop-templates/component.hbs'
                    },
                    {
                        type: 'add',
                        path: '__tests__/{{pascalCase name}}.test.tsx',
                        templateFile: 'plop-templates/component.test.hbs'
                    },
                    {
                        type: 'add',
                        path: 'src/shared/{{kebabCase name}}/styles.ts',
                        templateFile: 'plop-templates/component.styles.hbs'
                    }
                ];
            }
            return actions;
        }
    });
};