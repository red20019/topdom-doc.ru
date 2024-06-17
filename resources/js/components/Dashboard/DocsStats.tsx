import React, { useState } from "react";
import type { ColProps } from "antd/es/col";

import { Badge, Card, Col, List, Radio, Row } from "antd";
import { useSelector } from "react-redux";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data: { name: string; value: number }[] = [
  { name: "Черновик", value: 5 },
  { name: "Согласовано", value: 2 },
  { name: "Оплачено", value: 3 },
  { name: "Завершено", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E36E7E"];

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const DocsStats: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <Card
      className="DocsPercent"
      title="Статистика"
      loading={loading}
    >
      <Row className="items-center" gutter={20}>
        <Col {...wrapperCol}>
          <ResponsiveContainer height={250}>
            <PieChart>
              <Pie
                strokeOpacity={0}
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name }) => name}
              >
                {data.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col {...wrapperCol}>
          <List
            bordered
            dataSource={data}
            renderItem={(item, idx) => {
              const total = data.map((d) => d.value).reduce((a, b) => a + b);

              return (
                <List.Item>
                  <Badge color={COLORS[idx]} />
                  <span className="mx-1">{item.name}</span> | <span>{item.value}</span>{" "}
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default DocsStats;
