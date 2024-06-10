const fs = jest.genMockFromModule('fs');

let mockData = '';

fs.readFileSync = (path, encoding) => {
  if (path === './petshops.json') {
    return mockData;
  }
  throw new Error('File not found');
};

fs.__setMockData = (data) => {
  mockData = data;
};

export default fs;
