import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistoricEntity } from "../entity/historic.entity";
import { BaseHistoricDto } from "../dto/base-historic.dto";
import { addHistoricDto } from "../dto/addHistoric.dto";

@Injectable()
export class HistoricService {
  constructor(
    @InjectRepository(HistoricEntity)
    private historicRepository: Repository<HistoricEntity>,
  ) {}

  async getHistoric(id_locker: number): Promise<HistoricEntity[]> {
    try{ 
        console.log(id_locker)
        return await this.historicRepository.find({ where: { id_locker } });
    }catch(error){
    console.error("Erreur lors de la récupération de l'historique : ",  error)
    return null;
  }
  }

  async addHistoric(historic: Partial<addHistoricDto>): Promise<HistoricEntity | boolean | null>{
    try{
        const newHistoric = this.historicRepository.create(historic)
        return await this.historicRepository.save(newHistoric)
    }catch(error){
    console.error("Erreur lors de l'ajout dans l'historique : ",  error)
    return null;
  }
  }

}