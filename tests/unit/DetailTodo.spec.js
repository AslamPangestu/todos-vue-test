import { shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import DetailTodo from "../../src/pages/DetailTodo";
import mockData from "../../src/services/db.json";

jest.mock("axios");

let wrapper;

const setup = () => {
  wrapper = shallowMount(DetailTodo, {
    mocks: {
      $router: {
        push: jest.fn(),
      },
      $route: {
        params: {
          id: 1,
        },
      },
    },
  });
};

describe("DetailTodo Page", () => {
  it("show activity is already done", async () => {
    const data = mockData.todos.find((item) => item.is_done);
    axios.get.mockResolvedValue({ data });
    setup();
    expect(wrapper.findComponent({ ref: "loadingRef" }).exists()).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ ref: "successRef" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ ref: "doneRef" }).exists()).toBeTruthy();
  });
  it("show activity is not done and will set activity to be done if click done button", async () => {
    const data = mockData.todos.find((item) => !item.is_done);
    axios.get.mockResolvedValue({ data });
    setup();
    expect(wrapper.findComponent({ ref: "loadingRef" }).exists()).toBeTruthy();
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent({ ref: "successRef" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ ref: "notDoneRef" }).exists()).toBeTruthy();
    axios.patch.mockResolvedValue({ status: 200, message: "Success" });
    await wrapper.findComponent({ ref: "notDoneRef" }).trigger("click");
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: "TodoList",
    });
  });
});
