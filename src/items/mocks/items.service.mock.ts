import { itemsMock } from "./items.mock"

export class ItemsServiceMock {
    getItems = jest.fn().mockResolvedValue(itemsMock)
    createItem = jest.fn().mockResolvedValue(itemsMock)
    updateItem = jest.fn()
    deleteItem = jest.fn()
}