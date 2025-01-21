import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { connectToDatabase } from '../db/dbconn.js';
import { MONGO_URI } from '../config.js';

jest.mock('mongoose');

describe('Database Connection', () => {
  it('should connect to MongoDB successfully', async () => {
    console.log('[TEST] Mocking successful MongoDB connection...');
    mongoose.connect.mockResolvedValueOnce('Mocked MongoDB Connection');

    console.log('[TEST] Attempting to connect to the database...');
    await connectToDatabase();

    console.log(
      '[TEST] Verifying MongoDB connection was called with correct URI...'
    );
    expect(mongoose.connect).toHaveBeenCalledWith(MONGO_URI);
    console.log('[TEST] MongoDB connection test passed successfully');
  });

  it('should handle MongoDB connection errors', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(() => {});

    console.log('[TEST] Mocking MongoDB connection error...');
    mongoose.connect.mockRejectedValueOnce(new Error('Connection error'));

    console.log('[TEST] Attempting to connect to the database...');
    await connectToDatabase();

    console.log('[TEST] Verifying error handling for MongoDB connection...');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'MongoDB connection error:',
      expect.any(Error)
    );
    expect(processExitSpy).toHaveBeenCalledWith(1);
    console.log('[TEST] MongoDB connection error handling test passed');

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});