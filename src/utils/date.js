const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US").format(date);
};

export { formatDate };
