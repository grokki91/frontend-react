import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import userStore from '../store/UserStore';


const Date = () => {
    const {handleDateChange, inputStore} = userStore;
    const {getValue} = inputStore;
    // console.log(getValue("birthday"));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          className="datapicker"
          value={dayjs(getValue("birthday"))}
          onChange={handleDateChange}
          name="birthday"
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              className: "custom-datapicker",
              placeholder: "DD/MM/YYYY",
            },
          }}
        />
      </LocalizationProvider>
    );
}

export default Date;