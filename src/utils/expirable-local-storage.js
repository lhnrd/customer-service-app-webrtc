import ls from 'local-storage';

export default {
  get: key => {
    const record = JSON.parse(ls.get(key));
    if (!record) {
      return false;
    }
    return new Date().getTime() < record.timestamp && JSON.parse(record.value);
  },
  set: (key, value, min = 120) => {
    const ms = min * 60 * 1000;
    const record = {
      value,
      timestamp: new Date().getTime() + ms,
    };
    return ls.set(key, JSON.stringify(record));
  },
};
