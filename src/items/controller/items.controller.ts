import { Controller, Get, Post} from "@nestjs/common";

@Controller('api/items')
export class ItemsController{

    @Post()
    createItem(): string{
        return 'je crée un objet'
    }

    @Get()
    findAll(): string{
        return 'je récupère un objet'
    }
}