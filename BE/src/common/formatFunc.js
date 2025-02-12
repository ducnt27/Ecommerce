export const formatDataPaging = ({ limit, pageIndex, data, count }) => {
  const totalPage = count === 0 ? 0 : Math.ceil(count / limit);
  const totalOptionPage = data.length;
  const totalAllOptions = count;

  return {
    pageIndex: pageIndex,
    pageSize: limit, //Số sp trên mỗi trang.
    totalPage, //Tổng số trang.
    totalOptionPage, //Số sp có trong trang hiện tại.
    totalAllOptions, //Tổng số sp trong toàn bộ dữ liệu.
    content: data,
  };
};
