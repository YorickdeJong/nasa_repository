const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10; //0 means return all documents

function getPagination(query, dataCount) { //check what query id
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  const pageCount = dataCount / limit;
  console.log(`page count is: ${pageCount}`)
  
  return {
    skip,
    limit,
    pageCount
  };
}

module.exports = {
  getPagination,
};