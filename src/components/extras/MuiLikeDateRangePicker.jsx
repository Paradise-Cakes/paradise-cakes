import React, { useState, forwardRef, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  GlobalStyles,
  InputAdornment,
  TextField,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { CiCalendar } from "react-icons/ci";

const DateField = forwardRef(function DateField(
  { value, onClick, label, placeholder },
  ref
) {
  return (
    <TextField
      label={label}
      value={value || ""}
      placeholder={placeholder}
      onClick={onClick}
      inputRef={ref}
      fullWidth
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <CiCalendar fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
});

const startOfWeek = (d) => {
  const x = new Date(d);
  const day = x.getDay(); // 0 = Sun
  const diff = (day + 6) % 7; // start on Monday; change if you prefer Sunday
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
};

const endOfWeek = (d) => {
  const s = startOfWeek(d);
  const e = new Date(s);
  e.setDate(s.getDate() + 6);
  e.setHours(23, 59, 59, 999);
  return e;
};

const startOfMonth = (d) =>
  new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);

const endOfMonth = (d) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

export default function MuiLikeDateRangePicker({ label = "Date range" }) {
  const theme = useTheme();
  const [range, setRange] = useState([null, null]);
  const [startDate, endDate] = range;
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // MUI-themed overrides for react-datepicker
  const styles = {
    ".pc-datepicker-popper .react-datepicker": {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[3],
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
    },
    ".pc-datepicker-popper .react-datepicker__header": {
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    ".pc-datepicker-popper .react-datepicker__current-month, \
       .pc-datepicker-popper .react-datepicker-time__header, \
       .pc-datepicker-popper .react-datepicker-year-header": {
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(14),
    },
    ".pc-datepicker-popper .react-datepicker__day, \
       .pc-datepicker-popper .react-datepicker__time-name": {
      borderRadius: theme.shape.borderRadius,
    },
    ".pc-datepicker-popper .react-datepicker__day:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    ".pc-datepicker-popper .react-datepicker__day--selected, \
       .pc-datepicker-popper .react-datepicker__day--range-start, \
       .pc-datepicker-popper .react-datepicker__day--range-end": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    ".pc-datepicker-popper .react-datepicker__day--in-range, \
       .pc-datepicker-popper .react-datepicker__day--in-selecting-range": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    ".pc-datepicker-popper .react-datepicker__day--keyboard-selected": {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.text.primary,
    },
    ".pc-datepicker-popper .react-datepicker__day--today": {
      outline: `1px solid ${theme.palette.primary.main}`,
      outlineOffset: 0,
    },
    ".pc-datepicker-popper .react-datepicker__triangle": { display: "none" },
  };

  const setQuick = (key) => {
    const now = new Date();
    if (key === "today") {
      const s = new Date(now);
      s.setHours(0, 0, 0, 0);
      const e = new Date(now);
      e.setHours(23, 59, 59, 999);
      setRange([s, e]);
    } else if (key === "week") {
      setRange([startOfWeek(now), endOfWeek(now)]);
    } else if (key === "month") {
      setRange([startOfMonth(now), endOfMonth(now)]);
    } else {
      setRange([null, null]);
    }
  };

  useEffect(() => {
    setQuick("week");
  }, []);

  return (
    <Box className="date-range-picker">
      <GlobalStyles styles={styles} />

      <ReactDatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={setRange}
        monthsShown={2}
        shouldCloseOnSelect={false}
        dateFormat="MMM d, yyyy"
        popperClassName="pc-datepicker-popper"
        // MUI TextField as the input
        customInput={
          <DateField label={label} placeholder="Select a date range" />
        }
      />
      <Tabs className="date-tabs" value={tabValue} onChange={handleTabChange}>
        <Tab label="Due this week" onClick={() => setQuick("week")} />
        <Tab label="Due this month" onClick={() => setQuick("month")} />
        <Tab label="Custom" onClick={() => setQuick("clear")} />
      </Tabs>
    </Box>
  );
}
