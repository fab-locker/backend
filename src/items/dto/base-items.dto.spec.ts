import { BaseItemDto } from "./base-items.dto";

describe('ItemDto', () => {
  it('should be defined', () => {
    expect(new BaseItemDto()).toBeDefined();
  });
});
