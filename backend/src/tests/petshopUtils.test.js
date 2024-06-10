import { isWeekend, isHoliday } from '../utils/petshop.utils';
import axios from 'axios';
import fs from 'fs'

describe('petshop utils', () => {
    describe('isWeekend', () => {
        it('should return true for weekend dates', () => {
            const weekendDates = ['2024-06-08', '2024-06-09', '2024-06-15', '2024-06-16'];
            weekendDates.forEach(date => {
                expect(isWeekend(date)).toBe(true);
            });
        });

        it('should return false for weekdays', () => {
            const weekdayDates = ['2024-06-10', '2024-06-11', '2024-06-12', '2024-06-13', '2024-06-14'];
            weekdayDates.forEach(date => {
                expect(isWeekend(date)).toBe(false);
            });
        });
    });

    describe('isHoliday', () => {
        it('should return true for holiday dates', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: [{ date: '2024-06-10' }, { date: '2024-06-11' }]
            });

            jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([{ date: '2024-06-12' }, { date: '2024-06-13' }]));

            const holidayDates = ['2024-06-10', '2024-06-11', '2024-06-12', '2024-06-13'];
            for (const date of holidayDates) {
                expect(await isHoliday(date)).toBe(true);
            }
        });

        it('should return false for non-holiday dates', async () => {
            jest.spyOn(axios, 'get').mockResolvedValue({
                data: []
            });

            jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([]));

            const nonHolidayDates = ['2024-06-14', '2024-06-15', '2024-06-16'];
            for (const date of nonHolidayDates) {
                expect(await isHoliday(date)).toBe(false);
            }
        });
    });
});
