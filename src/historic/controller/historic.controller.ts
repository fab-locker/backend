import { Controller, Get, Post,Param, Body, Patch, Delete} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { HistoricService } from "../service/historic.service";
import { BaseHistoricDto } from "../dto/base-historic.dto";
import { HistoricEntity } from "../entity/historic.entity";
import { GetHistoricDto } from "../dto/get_historic.dto";
import { query } from "express";

@ApiTags('Historic')
@Controller('api/historic')
export class HistoricController{
    constructor(private historicService: HistoricService){
    }

    @ApiOperation({ summary: 'Get historic' })
    @ApiOkResponse({ description: 'Success', type: [HistoricEntity] })
    @Get()
    async getHistoric(@Param('id') locker_id: number): Promise<HistoricEntity| null> {
        return this.historicService.getHistoric(locker_id);
      }

      @ApiOperation({summary : 'add to historic'})
      @ApiOkResponse({description: 'Success', type: [HistoricEntity]})
      @Post()
      async addHistoric(@Body() historic? : Partial<BaseHistoricDto>): Promise<HistoricEntity | boolean | null> {
        return 
      }


}
