'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type MonthYearPickerProps = {
    selectedDate: Date,
    setSelectedDate: (selectedDate: Date) => void
}


export default function MonthYearPicker({ selectedDate, setSelectedDate }: MonthYearPickerProps) {

    return (
        <div className="content-center text-center">
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date!)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                className="h-9 w-[100px] px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
        </div>
    );
}
