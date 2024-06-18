import React from "react";
import Schedule from "../components/Schedule";
import { Typography, DatePicker } from "antd";
import { useState } from "react";
import DebounceSelect from "../components/DebounceSelect";
import { getStreams, getGroups } from "../services/api";
import * as dayjs from "dayjs";

const today = dayjs();

const SearchSchedulePage = () => {
  const [date, setDate] = useState(today);
  const [streams, setStreams] = useState([]);
  const [groups, setGroups] = useState([]);

  const dataHandler = async (date, dateString) => {
    setDate(date);
  };

  async function fetchStreamList(value) {
    const { data } = await getStreams({ _q: value });

    return data.map(({ attributes, id }) => ({
      label: `${attributes.name}`,
      value: id,
    }));
  }
  async function fetchGroupList(value) {
    const { data } = await getGroups({
      _q: value,
      filters: {
        stream: streams[0].value,
      },
    });
    return data.map(({ attributes, id }) => ({
      label: `${attributes.name}`,
      value: id,
    }));
  }

  return (
    <div>
      <h1>Пошук Розкладу</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "16px",
          gap: "20px",
          paddingLeft: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
            gap: "16px",
          }}
        >
          <Typography style={{ fontSize: "16px" }}>Поток:</Typography>
          <DebounceSelect
            mode="multiple"
            value={streams}
            placeholder="Поток"
            fetchOptions={fetchStreamList}
            onChange={(newValue) => {
              setStreams(newValue);
            }}
            style={{ width: "200px" }}
            maxCount={1}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
            gap: "16px",
          }}
        >
          <Typography style={{ fontSize: "16px" }}>Група:</Typography>
          <DebounceSelect
            mode="multiple"
            value={groups}
            disabled={streams.length === 0}
            placeholder="Група"
            fetchOptions={fetchGroupList}
            onChange={(newValue) => {
              setGroups(newValue);
            }}
            style={{ width: "200px" }}
            maxCount={1}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "16px",
          gap: "16px",
          paddingLeft: "8px",
        }}
      >
        <Typography style={{ fontSize: "16px" }}>Дата:</Typography>
        <DatePicker onChange={dataHandler} value={date} />
      </div>
      <Schedule
        filters={{
          date: date.format("YYYY-MM-DD"),
          group: groups.length > 0 ? groups[0].value : "",
        }}
      />
    </div>
  );
};

export default SearchSchedulePage;
