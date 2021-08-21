import { shallowMount } from "@vue/test-utils";
import axios from "axios";
import flushPromises from "flush-promises";
import NewTodo from "../../src/pages/NewTodo";

jest.mock("axios");

let wrapper;

const setup = () => {
  wrapper = shallowMount(NewTodo, {
    mocks: {
      $router: {
        push: jest.fn(),
      },
    },
  });
};

describe("NewTodo Page", () => {
  it("show error message if click and form incomplete", async () => {
    setup();
    await wrapper.findComponent({ ref: "inputTodo" }).setValue("mandi");
    expect(wrapper.findComponent({ ref: "errorMessage" }).exists()).toBeFalsy();
    await wrapper.findComponent({ ref: "button" }).trigger("click");
    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists()
    ).toBeTruthy();
  });

  it("redirect to todolist if success save data and response status 201", async () => {
    axios.post.mockResolvedValue({ status: 201, message: "Success" });
    setup();
    await wrapper.findComponent({ ref: "inputTodo" }).setValue("mandi");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("Kamar Mandi");
    await wrapper
      .findComponent({ ref: "inputDetail" })
      .setValue("bersihin badan biar wangi");

    await wrapper.findComponent({ ref: "button" }).trigger("click");
    expect(
      wrapper.findComponent({ ref: "button" }).attributes("disabled")
    ).toBeTruthy();
    await flushPromises();
    expect(wrapper.findComponent({ ref: "errorMessage" }).exists()).toBeFalsy();

    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: "TodoList" });
  });

  it("show error message if status not 201", async () => {
    axios.post.mockResolvedValue({ status: 500, message: "Server Error" });
    setup();
    await wrapper.findComponent({ ref: "inputTodo" }).setValue("mandi");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("Kamar Mandi");
    await wrapper
      .findComponent({ ref: "inputDetail" })
      .setValue("bersihin badan biar wangi");

    await wrapper.findComponent({ ref: "button" }).trigger("click");
    await flushPromises();
    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists()
    ).toBeTruthy();
  });

  it("show error message if failed save data", async () => {
    axios.post.mockRejectedValue({ message: "Failed" });
    setup();
    await wrapper.findComponent({ ref: "inputTodo" }).setValue("mandi");
    await wrapper.findComponent({ ref: "inputWhere" }).setValue("Kamar Mandi");
    await wrapper
      .findComponent({ ref: "inputDetail" })
      .setValue("bersihin badan biar wangi");

    await wrapper.findComponent({ ref: "button" }).trigger("click");
    await flushPromises();
    expect(
      wrapper.findComponent({ ref: "errorMessage" }).exists()
    ).toBeTruthy();
  });
});
