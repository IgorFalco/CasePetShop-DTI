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

            const numSmallDogsInt = parseInt(numSmallDogs);
            const numBigDogsInt = parseInt(numBigDogs);

            if (isNaN(parseInt(numSmallDogs)) || isNaN(parseInt(numBigDogs))) {
                return res.status(400).send({ message: `"numSmallDogs" e "numBigDogs" devem ser números válidos` });
            }

            const petshop = new petShop();
            const bestPetPrice = await petshop.findBestPetShop(date, numSmallDogsInt, numBigDogsInt);
            res.status(200).json(bestPetPrice);

        } catch (error) {

            res.status(500).send({ message: 'Erro ao pegar o melhor preço do petShop', error });

        }

    }

}
