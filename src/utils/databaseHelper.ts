//Import the mongoose module
import * as mongoose from "mongoose"

class Database { // Singleton
  connection = mongoose.connection;
  
  constructor() {
    try {
      this.connection
      .on('open', console.info.bind(console, 'Database connection: open'))
      .on('close', console.info.bind(console, 'Database connection: close'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
      .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
      .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
      .on('all', console.info.bind(console, 'Database connection: all'))
      .on('error', console.error.bind(console, 'MongoDB connection: error:'));
    } catch (error) {
      console.error(error);
    }
  }

  async connect(connectionString: string) {
    try {
      await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (error) {
      console.error(error);
    }
  }

  async close() {
    try {
      await this.connection.close();
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Database();