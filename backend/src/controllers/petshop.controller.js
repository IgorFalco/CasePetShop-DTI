import { appError } from '../errors/appError.js';
import petShop from '../services/petshop.services.js';

export default class petShopController {

    async getAll(req, res) {

        try {

            const petshop = new petShop();
            const petshops = await petshop.getAll();
            res.status(200).json(petshops);

        } catch (error) {

            res.status(500).send({ message: 'Erro ao pegar todos os dados dos petshops', error });

        }

    }

    async getBestPetShop(req, res) {

        try {

            const { date, numSmallDogs, numBigDogs } = req.body;

            if (!date || !numSmallDogs || !numBigDogs) {

                throw new appError(`Parâmetros "date", "numSmallDogs" e "numBigDogs" são obrigatórios`, 400);
            }

            const numSmallDogsInt = parseInt(numSmallDogs);
            const numBigDogsInt = parseInt(numBigDogs);

            if (isNaN(numSmallDogsInt) || isNaN(numBigDogsInt)) {
                throw new appError(`"numSmallDogs" e "numBigDogs" devem ser números válidos`, 400);
            }

            const petshop = new petShop();
            const bestPetPrice = await petshop.findBestPetShop(date, numSmallDogsInt, numBigDogsInt);
            res.status(200).json(bestPetPrice);

        } catch (error) {

            res.status(500).send({ message: 'Erro ao pegar o melhor preço do petShop', error });

        }

    }

}
