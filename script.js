let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function start() {
  if (!timer) {
    timer = setInterval(updateTimer, 100);
  }
}

function pause() {
  clearInterval(timer);
  timer = null;
  logAction("Paused", updateTimerDisplay());
}

function reset() {
  clearInterval(timer);
  timer = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateTimerDisplay();
  logAction("Reset", updateTimerDisplay());
}

function updateTimer() {
  milliseconds += 100;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hrs = formatTime(hours);
  const mins = formatTime(minutes);
  const secs = formatTime(seconds);
  const msecs = formatTime(milliseconds);
  const display = `${hrs}:${mins}:${secs}:${msecs}`;

  document.getElementById("timer").innerText = display;
  return display;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function logAction(action, time) {
  const logElement = document.getElementById("log");
  const logEntry = document.createElement("div");
  logEntry.innerText = `${time} - ${action}`;
  logElement.appendChild(logEntry);
}

function forward() {
  seconds += 10;
  if (seconds >= 60) {
    const extraMinutes = Math.floor(seconds / 60);
    seconds %= 60;
    minutes += extraMinutes;
    if (minutes >= 60) {
      const extraHours = Math.floor(minutes / 60);
      minutes %= 60;
      hours += extraHours;
    }
  }
  updateTimerDisplay();
  logAction("Forwarded 10 seconds", updateTimerDisplay());
}

function backward() {
  seconds -= 10;
  if (seconds < 0) {
    const borrowMinutes = Math.ceil(-seconds / 60);
    seconds += 60 * borrowMinutes;
    minutes -= borrowMinutes;
    if (minutes < 0) {
      const borrowHours = Math.ceil(-minutes / 60);
      minutes += 60 * borrowHours;
      hours -= borrowHours;
    }
    if (hours < 0) {
      reset();
    }
  }

  updateTimerDisplay();
  logAction("Backwarded 10 seconds", updateTimerDisplay());
}
