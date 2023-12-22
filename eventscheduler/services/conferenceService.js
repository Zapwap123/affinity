// const { formatTime } = require("../utils/timeFormatter");

// Conference scheduling function
function scheduleConferenceTalks(conferenceTalks) {
  const MORNING_SESSION_START = 9 * 60; // 9:00 AM in minutes
  const MORNING_SESSION_END = 12 * 60; // 12:00 PM in minutes
  const AFTERNOON_SESSION_START = 13 * 60; // 1:00 PM in minutes
  const NETWORKING_EVENT_START = 16 * 60; // 4:00 PM in minutes
  const NETWORKING_EVENT_END = 17 * 60; // 5:00 PM in minutes
  const LUNCH_DURATION = 60; // 60 minutes for lunch

  const tracks = [];
  let currentTrack = 1;

  while (conferenceTalks.length > 0) {
    const track = {
      trackNumber: currentTrack,
      morning: [],
      afternoon: [],
    };

    let currentTime = MORNING_SESSION_START;

    while (conferenceTalks.length > 0 && currentTime < MORNING_SESSION_END) {
      const talk = conferenceTalks.shift().replace(/\r$/, ""); // Remove "\r" at the end
      const duration = talk.includes("lightning")
        ? 5
        : parseInt(talk.match(/\d+/)[0], 10);

      if (currentTime + duration <= MORNING_SESSION_END) {
        track.morning.push(`${formatTime(currentTime)} ${talk}`);
        currentTime += duration;
      }
    }

    // Add lunch to the morning array
    track.morning.push(`${formatTime(MORNING_SESSION_END)} Lunch`);

    currentTime = AFTERNOON_SESSION_START;

    while (conferenceTalks.length > 0 && currentTime < NETWORKING_EVENT_END) {
      const talk = conferenceTalks.shift().replace(/\r$/, ""); // Remove "\r" at the end
      const duration = talk.includes("lightning")
        ? 5
        : parseInt(talk.match(/\d+/)[0], 10);
      if (currentTime + duration <= NETWORKING_EVENT_START) {
        track.afternoon.push(`${formatTime(currentTime)} ${talk}`);
        currentTime += duration;
      } else if (currentTime + duration <= NETWORKING_EVENT_END) {
        track.afternoon.push(
          `${formatTime(NETWORKING_EVENT_START)} Networking Event`
        );
        currentTime = NETWORKING_EVENT_END;
      }
      // if (currentTime + duration <= NETWORKING_EVENT_END) {
      //   track.afternoon.push(`${formatTime(currentTime)} ${talk}`);
      //   currentTime += duration;
      // } else {
      //   track.afternoon.push(
      //     `${formatTime(NETWORKING_EVENT_END)} Networking Event`
      //   );
      //   currentTime = NETWORKING_EVENT_END;
      // }
    }

    if (track.afternoon.length > 0) {
      tracks.push(track);
      currentTrack++;
    }
  }

  return tracks;
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
// // Test output
// const schedule = scheduleConferenceTalks(conferenceTalks);
// schedule.forEach((track, index) => {
//   console.log(`\nTrack ${index + 1}:`);
//   track.morning.forEach((talk) => console.log(` ${talk}`));
//   track.afternoon.forEach((talk) => console.log(` ${talk}`));
// });

module.exports = {
  scheduleConferenceTalks,
};
