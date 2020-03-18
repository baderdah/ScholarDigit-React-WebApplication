export function paginate(items, pageNb, pageSize) {
  const startIndex = (pageNb - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
