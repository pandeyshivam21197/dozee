import moment from 'moment';
function sort(object) {
  const ordered = Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});

  return ordered;
}

function getAverageData(arrayData, data) {
  Object.keys(arrayData).forEach(key => {
    const prevValue = arrayData[key];
    const newValue = data[key];

    if (Object.keys(data).includes(key)) {
      if (typeof prevValue === 'object') {
        getAverageData(prevValue, newValue);
      }
      if (prevValue && newValue) {
        arrayData[key] = (prevValue + newValue) / 2;
      }
    }
  });
}

function getWeeks(weeks, days) {
  Object.keys(days).reduce((data, key, index, array) => {
    const dayData = days[key];

    // TODO: check for logic
    if (index !== 0 && (index + 1) % 7 === 0) {
      const start = index + 1 - 7;
      const end = index + 1;
      weeks[`${start}-${end}`] = data;
    }

    getAverageData(data, dayData);
  }, {});
}

export function getDWMprocessedData(data) {
  const DWMdata = [...data].reduce(
    (groups, userData, index, array) => {
      const {time, ...rest} = userData;
      const isValid = moment(new Date(time)).isValid();
      const dateFromated = moment(new Date(time)).format('DD-MM');
      if (isValid) {
        const [day, month] = dateFromated.split('-');

        if (groups.days[day] && Object.keys(groups.days[day]).length) {
          getAverageData(groups.days[day], rest);
        } else {
          groups.days[day] = rest;
        }
        if (groups.days[month] && Object.keys(groups.months[month]).length) {
          getAverageData(groups.days[month], rest);
        } else {
          groups.months[month] = rest;
        }
      }
      if (index === array.length - 1) {
        const {days, months} = groups;
        sort(days);
        sort(months);
      }
      return groups;
    },
    {weeks: {}, days: {}, months: {}},
  );

  getWeeks(DWMdata.weeks, DWMdata.days);

  return DWMdata;
}

export function getSectionProcessedData(readings) {
  const {sleepscore, Recovery, ...rest} = readings;

  const sleepData = {sleepscore, Recovery};

  const vitalArray = Object.keys(rest).map(key => {
    return {heading: key, value: rest[key]};
  });

  const sleepArray = Object.keys(sleepData).map(key => {
    return {heading: key, value: sleepData[key]};
  });

  return [
    {
      title: 'Vitals',
      data: vitalArray,
    },
    {
      title: 'Sleep',
      data: sleepArray,
    },
  ];
}
