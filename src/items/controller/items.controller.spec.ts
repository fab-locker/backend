import { Test, TestingModule } from "@nestjs/testing";
import { ItemsController } from "./items.controller"
import { ItemsService } from "../service/items.service";
import { ItemsServiceMock } from "../mocks/items.service.mock";
import { itemsMock } from "../mocks/items.mock";

describe('ItemsController',() => {
    let controller: ItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [{provide : ItemsService, useClass : ItemsServiceMock}]
        }).compile();

        controller = module.get<ItemsController>(ItemsController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    describe("getItems", ()=>{
        it("should return all items", async () => {
            expect(await controller.getItems()).resolves.toEqual(itemsMock)
        })
        it("should return one specific item", async ()=>{
            expect(await controller.getItems({"id_locker": 10})).resolves.toContainEqual(itemsMock.find(itemsMock => itemsMock.id_locker === 10))
        })
        it("should return a list of item with the same name", async () =>{
            expect(await controller.getItems({"name": "clavier"})).resolves.toContainEqual(itemsMock.find(itemsMock => itemsMock.name === "clavier"))
        })

        it("should return one item with the same properties", async () =>{
            expect(await controller.getItems(itemsMock[0])).resolves.toContainEqual(itemsMock[0])
        })
    })

    describe("createItem",()=>{
        // it("should create an item", async () => {
        //     expect(await controller.createItem()).resolves.toContainEqual(itemsMock[0])
        // })
    })
})