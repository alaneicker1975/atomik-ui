module.exports = {
  name: 'Data Display',
  content: './styleguide/docs/DataDisplay.md',
  usageMode: 'expand',
  exampleMode: 'expand',
  sectionDepth: 6,
  components: () => {
    return [
      'src/components/avatar/Avatar.js',
      'src/components/list/List.js',
      'src/components/list-item/ListItem.js',
    ];
  },
};