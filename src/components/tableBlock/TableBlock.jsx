// RouteTable.js
import React from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRoute } from "../../store/slices/routeReducers";

const columns = [
  {
    title: "Маршрут",
    dataIndex: "route",
    key: "route",
  },
  {
    title: "Точки",
    dataIndex: "points",
    key: "points",
    render: (points) => (
      <ol>
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ol>
    ),
  },
];

const TableBlock = () => {
  const routes = useSelector((state) => state.routes.routes);
  const selectedRouteIndex = useSelector(
    (state) => state.routes.selectedRouteIndex
  );

  const dispatch = useDispatch();

  const handleRowClick = (index) => {
    dispatch(setSelectedRoute(index));
  };

  const data = routes.map((route, index) => ({
    key: index,
    route: `Маршрут №${index + 1}`,
    points: route,
  }));


  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="key"
      onRow={(record) => ({
        onClick: () => handleRowClick(record.points),
      })}
      rowClassName={(record) =>
        record.points === selectedRouteIndex ? "selected-row" : ""
      }
    />
  );
};

export default TableBlock;
