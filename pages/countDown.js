import React, { useEffect, useState } from "react";

const futureDate = new Date(1655740800000);
// const futureDate = new Date(1655649466000);

const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds(),
  };
};
export default function CountDown(props) {
  const [diff, setDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0.0,
    month: 0,
    second: 0.0,
    year: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDateDiff(new Date(), futureDate));
      if (new Date() > futureDate) {
        console.log("time is up");
        props.trigger2(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="full-width">
      <p className="mint-head">Wait for sometime to shit</p>
      <p className="mint-counter">
        {diff?.day}D:{diff?.hour}H:{diff?.minute}M:{diff?.second}S
      </p>
    </div>
  );
}
