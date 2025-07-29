import { parse, format } from "date-fns";

const getNextAppointment = (appointments) => {
  const now = new Date();
  console.log("Your appointments", appointments);

  return appointments
    .map((app) => {
      const dateTimeString = `${app.date} ${app.time}`;
      const parsedDate = parse(
        dateTimeString,
        "MMMM d, yyyy h:mm a",
        new Date()
      );
      return {
        ...app,
        datetime: parsedDate,
      };
    })
    .filter((app) => app.datetime > now)
    .sort((a, b) => a.datetime - b.datetime)[0]; // nearest future appointment
};

const NextAppointmentNotice = ({ appointments }) => {
  if (!appointments || appointments.length === 0) return null;

  const next = getNextAppointment(appointments);

  if (!next) {
    return <p>You have no upcoming appointments.</p>;
  }

  const formattedDate = format(next.datetime, "MMMM d, yyyy");
  const formattedTime = format(next.datetime, "h:mm a");

  return (
    <p>
      Your next appointment is on {formattedDate} at {formattedTime} with Dr.{" "}
      {next.doctor.first_name}
    </p>
  );
};

export default NextAppointmentNotice;
