module.exports = {
  async up(db, client) {
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstname', 'lastname', 'email', 'mobile', 'password'],
          properties: {
            firstname: { bsonType: 'string' },
            lastname: { bsonType: 'string' },
            email: { bsonType: 'string' },
            mobile: { bsonType: 'string' },
            password: { bsonType: 'string' },
            role: { bsonType: 'string' },
            isBlocked: { bsonType: 'bool' },
            cart: { bsonType: 'array' },
            address: { bsonType: 'string' },
            wishlist: { bsonType: 'array', items: { bsonType: 'objectId' } },
            refreshToken: { bsonType: 'string' },
            passwordChangedAt: { bsonType: 'date' },
            passwordResetToken: { bsonType: 'string' },
            passwordResetExpires: { bsonType: 'date' },
          },
        },
      },
    });
  },
  
  
  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
