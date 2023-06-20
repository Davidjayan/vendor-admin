module.exports = {
  async up(db, client) {
    await db.collection("Test").insertOne({ vendorName: "" });
    await db
      .collection("Test")
      .createIndex({ vendorName: 1 }, { unique: true });
  },

  async down(db, client) {
    db.collection("Test").drop();
  },
};
