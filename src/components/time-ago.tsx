import { useEffect, useState } from "react";
import { format } from "timeago.js";

type TimeAgoProps = {
  date: string;
};

export const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const [formatedDate, setFormatedDate] = useState(format(date + "Z"));

  useEffect(() => {
    const interval = setInterval(() => {
      setFormatedDate(format(date + "Z"));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return <>{formatedDate}</>;
};
