import { itemsMock } from "./items.mock"

export class ItemsServiceMock {
    getItems = jest.fn().mockResolvedValue(itemsMock)
    createItem = jest.fn()
    updateItem = jest.fn()
    deleteItem = jest.fn()
}