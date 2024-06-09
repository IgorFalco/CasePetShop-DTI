
import moment from 'moment'
import axios from 'axios'
import dotenv from 'dotenv'
import { appError } from '../errors/appError.js';
import fs from 'fs'
import path from 'path'

dotenv.config();

export function isWeekend(date) {
    const day = moment(date).day();
    return day === 0 || day === 6;
};

export async function isHoliday(date) {
    const year = moment(date).year();

    try {
        const response = await axios.get(`https://api.invertexto.com/v1/holidays/${year}`, {
            params: {
                token: process.env.TOKEN_HOLYDAYS,
                state: 'MG'
            }
        });

        const holidays = response.data;

        const cityHolidays = JSON.parse(fs.readFileSync('./src/utils/feriadosMunicipais.json', 'utf8'));

        for (const cityHoliday of cityHolidays) {

            holidays.push(cityHoliday);

        }

        const foundHoliday = holidays.find(holiday => holiday.date === moment(date).format('YYYY-MM-DD'));

        return !!foundHoliday;

    } catch (error) {

        throw new appError(`Erro ao buscar os feriados:${error}`, 500)
    }

};
