import { shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import TodoList from "../../src/pages/TodoList";
import mockData from "../../src/services/db.json";

jest.mock("axios");

let wrapper;

const setup = () => {
  wrapper = shallowMount(TodoList, {
    stubs: ["router-link"],
  });
};

describe("TodoList Page", () => {
  it("show error message if failed get todo service", async () => {
    axios.get.mockRejectedValue({ message: "Failed get data" });
    setup();
    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists()
    ).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ ref: "errorState" }).exists()).toBeTruthy();
  });

  it("show empty message if get todo service return no data", async () => {
    axios.get.mockResolvedValue({ data: [] });
    setup();
    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists()
    ).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ ref: "emptyState" }).exists()).toBeTruthy();
  });

  it("show data if get todo service success", async () => {
    axios.get.mockResolvedValue({ data: mockData.todos });
    setup();
    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists()
    ).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(
      wrapper.findComponent({ ref: "successState" }).exists()
    ).toBeTruthy();
  });

  it("total data as same from service", async () => {
    axios.get.mockResolvedValue({ data: mockData.todos });
    setup();
    expect(
      wrapper.findComponent({ ref: "loadingState" }).exists()
    ).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    const itemLength = wrapper.findAllComponents({ ref: "todoItem" }).length;
    expect(itemLength).toBe(mockData.todos.length);
  });
});
