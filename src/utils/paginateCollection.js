import { calculatePaginationData } from './calculatePaginationData.js';

export const paginateCollection = async ({
  collection,
  filter,
  page,
  perPage,
  populateBy,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = collection.find(filter);

  if (populateBy) {
    query = query.populate(populateBy);
  }

  const itemsCount = await collection.countDocuments(filter);

  const data = await query.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(itemsCount, perPage, page);

  return {
    data,
    paginationData,
  };
};
