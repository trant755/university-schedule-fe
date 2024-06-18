import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import { getSchedule, getTimeSlots } from "../services/api";
import ScheduleItem from "./ScheduleItem";

const Schedule = ({ userRoleDetails, date, filters, isEdit = false }) => {
  const [schedule, setSchedule] = useState([]);
  const [triger, setTriger] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dataSchedule } = await getSchedule({
          filters,
        });
        const { data: dataTimeSlots } = await getTimeSlots();

        const scheduleList = dataTimeSlots.map((timeSlot) => {
          let schedule = dataSchedule.find((schedule) => {
            return schedule.attributes.time_slot.data.id === timeSlot.id;
          });

          const listItem = {
            timeSlot,
            schedule: schedule ? schedule : null,
          };

          return listItem;
        });

        setSchedule(scheduleList);
      } catch (error) {
        message.error("Error fetching schedule");
        console.error("Error fetching schedule:", error);
      }
    };

    fetchData();
  }, [filters, triger]);

  return (
    <div style={{}}>
      <List
        itemLayout="horizontal"
        style={{ margin: "0 auto" }}
        dataSource={schedule}
        renderItem={({ timeSlot, schedule }) => (
          <List.Item>
            <ScheduleItem
              date={date}
              userRoleDetails={userRoleDetails}
              timeSlot={timeSlot}
              schedule={schedule}
              isEdit={isEdit}
              setTriger={setTriger}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Schedule;
