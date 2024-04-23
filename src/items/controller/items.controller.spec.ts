import { Test, TestingModule } from "@nestjs/testing";
import { ItemsController } from "./items.controller"
import { ItemsService } from "../service/items.service";
import { ItemsServiceMock } from "../mocks/items.service.mock";
import { itemsMock } from "../mocks/items.mock";
import { CreateItemDto } from "../dto/create-item.dto";

describe('ItemsController',() => {
    let itemsService: ItemsService
    let itemsController: ItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [{provide : ItemsService, useClass : ItemsServiceMock}]
        }).compile();

        itemsController = module.get<ItemsController>(ItemsController)
    })

    it("should be defined", () => {
        expect(itemsController).toBeDefined()
    })

    describe("getItems", ()=>{
        it("should return all items", () => {
            expect(itemsController.getItems()).resolves.toEqual(itemsMock)
        })
        it("should return one specific item", () => {
            expect(itemsController.getItems({"id_locker": 10})).resolves.toContainEqual(itemsMock.find(itemsMock => itemsMock.id_locker === 10))
        })
        it("should return a list of item with the same name",() =>{
            expect(itemsController.getItems({"name": "clavier"})).resolves.toContainEqual(itemsMock.find(itemsMock => itemsMock.name === "clavier"))
        })

        it("should return one item with the same properties",() =>{
            expect(itemsController.getItems(itemsMock[0])).resolves.toContainEqual(itemsMock[0])
        })
    })

    describe("createItem",()=>{

        it("should create an item", () => {

            const newItem= {
                "id_locker": 31,
                "name": "ecran",
                "description": "permet de faire de lelec",
                "availability": true,
                "weight": 16,
                "borrow_duration": 7
            }

            expect(itemsService.createItem).toHaveBeenCalled();
            expect(itemsController.createItem(newItem as CreateItemDto)).toEqual(itemsMock)

        })
    })
})