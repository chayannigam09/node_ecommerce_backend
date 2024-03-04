module.exports = {
    mongodb: {
      url: 'mongodb://localhost:27017/retailStore',
      options: {},
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: ".js",
    moduleSystem: 'commonjs',
  };
  