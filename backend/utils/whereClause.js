//base - Product.find({'name':'iPhone'})
//bigQuery - search=iPhone&page=2&category=electronics&rating[gte]=4&price[lte]=100000&limit=5

class WhereClause {
  constructor(base, bigQuery) {
    this.base = base;
    this.bigQuery = bigQuery;
  }
  search() {
    const searchedWord = this.bigQuery.search
      ? {
          name: {
            $regex: this.bigQuery.search,
            $options: 'i',
          },
        }
      : {};
    this.base = this.base.find({ ...searchedWord });
    return this;
  }
  filter() {
    let copyOfBigQuery = { ...this.bigQuery };
    delete copyOfBigQuery['search'];
    delete copyOfBigQuery['page'];
    delete copyOfBigQuery['limit'];
    //Converty BigQuery into String
    let copyOfBigQueryString = JSON.stringify(copyOfBigQuery);
    copyOfBigQueryString = copyOfBigQueryString.replace(
      /\b(gte|lte)\b/g,
      (match) => `$${match}`
    );
    let copyOfBigQueryObject = JSON.parse(copyOfBigQueryString);
    this.base = this.base.find(copyOfBigQueryObject);
    return this;
  }
  pager(resultPerPage) {
    const page = this.bigQuery.page || 1;
    const skip = (page - 1) * resultPerPage;
    this.base = this.base.skip(skip).limit(resultPerPage);
    return this;
  }
}

module.exports = WhereClause;
