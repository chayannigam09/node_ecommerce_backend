module.exports = {
    mongodb: {
      url: 'mongodb://localhost:27017/digitic',
      options: {},
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: ".js",
    moduleSystem: 'commonjs',
  };
  