import fs from 'fs';
import { appError } from '../errors/appError.js';
import { isHoliday, isWeekend } from '../utils/petshop.utils.js'

export default class petShop {

    getAll() {

        try {

            const data = JSON.parse(fs.readFileSync('./petshops.json', 'utf8'));
            return data.petshops;

        } catch (error) {

            throw new appError("Não foi possível pegar os dados dos petshops!", 404);

        }

    };
    async getPrice(petshop, date, numSmallDogs, numBigDogs) {

        let prices;

        try {

            if (petshop.usefulDay) {
                if (await isHoliday(date)) {
                    return 0;
                }
            }

            if (isWeekend(date)) {
                prices = petshop.prices.weekends;
            } else {
                prices = petshop.prices.weekdays;
            }

            const smallDogsPrice = prices.small * numSmallDogs;
            const bigDogsPrice = prices.large * numBigDogs;

            return smallDogsPrice + bigDogsPrice;

        } catch (error) {
            console.log(error)
        }

    }
    async findBestPetShop(date, numSmallDogs, numBigDogs) {

        try {
            const petshops = this.getAll();
            const prices = []


            if (numSmallDogs < 0 || numBigDogs < 0) {
                throw new appError("Não é possível números menores que 0!", 400);
            }

            for (const petshop of petshops) {

                const price = await this.getPrice(petshop, date, numSmallDogs, numBigDogs)
                prices.push({ name: petshop.name, distance: petshop.distance, price: price });
            }

            // Valores iguais a zero nos dizem que o petshop não funciona em dia de feriado
            const validPrices = prices.filter(item => item.price > 0);

            if (validPrices.length === 0) {
                throw new appError("Não há preços válidos disponíveis!", 404);
            }



            // Encontrar o petshop com o menor preço e menor distância em caso de empate
            const bestPetShop = validPrices.reduce((prev, curr) => {
                if (curr.price < prev.price) {
                    return curr;
                } else if (curr.price === prev.price) {
                    return curr.distance < prev.distance ? curr : prev;
                } else {
                    return prev;
                }
            });

            return bestPetShop;

        } catch (error) {

            throw new appError("Não foi possível pegar os dados dos petshops!", 404);

        }

    };
}

